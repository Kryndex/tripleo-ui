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

import { List, Map, Record } from 'immutable';

export const RolesState = Record({
  loaded: false,
  isFetching: false,
  roles: Map()
});

export const Role = Record({
  CountDefault: 0,
  HostnameFormatDefault: '%stackname%-{{role.name.lower()}}-%index%',
  disable_constraints: false,
  disable_upgrade_deployment: false,
  upgrade_batch_size: 1,
  ServicesDefault: List(),
  tags: List(),
  description: undefined,
  name: undefined,
  networks: List(),
  title: undefined,
  identifier: undefined
});
