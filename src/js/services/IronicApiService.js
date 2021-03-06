/**
 * Copyright 2017 Red Hat Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import axios from 'axios';
import when from 'when';

import { AuthenticationError, IronicApiError, ConnectionError } from './errors';
import { getAuthTokenId, getServiceUrl } from '../selectors/auth';

class IronicApiService {
  defaultRequest(path, additionalAttributes) {
    return (dispatch, getState) =>
      axios(
        Object.assign(
          {
            baseURL: getServiceUrl(getState(), 'ironic'),
            url: path,
            method: 'GET',
            headers: {
              'X-Auth-Token': getAuthTokenId(getState()),
              'X-OpenStack-Ironic-API-Version': '1.14'
            }
          },
          additionalAttributes
        )
      );
  }

  /**
   * Ironic API: GET /v1/nodes/detail
   * @returns {array} of nodes with complete details
   */
  getNodes() {
    return dispatch =>
      dispatch(this.defaultRequest('/nodes/detail'))
        .then(response => response.data)
        .catch(handleErrors);
  }

  getPorts() {
    return dispatch =>
      dispatch(this.defaultRequest('/ports/detail'))
        .then(response => response.data)
        .catch(handleErrors);
  }

  patchNode(nodePatch) {
    return dispatch =>
      dispatch(
        this.defaultRequest('/nodes/' + nodePatch.uuid, {
          method: 'PATCH',
          data: nodePatch.patches
        })
      )
        .then(response => response.data)
        .catch(handleErrors);
  }

  deleteNode(nodeId) {
    return dispatch =>
      dispatch(
        this.defaultRequest('/nodes/' + nodeId, {
          method: 'DELETE'
        })
      )
        .then(response => response.data)
        .catch(handleErrors);
  }
}

const handleErrors = e => {
  if (e.response && e.response.status === 401) {
    return when.reject(new AuthenticationError(e));
  } else if (e.response) {
    return when.reject(new IronicApiError(e));
  } else if (e.request) {
    return when.reject(
      new ConnectionError(
        'Connection to Ironic API could not be established',
        e
      )
    );
  } else {
    return when.reject(e);
  }
};

export default new IronicApiService();
