import { Api } from "./api/Api"

export class VeniceRcon {
  readonly api: Api

  constructor(props: VeniceRcon.Props) {
    this.api = new Api(props)
  }

  login(username: string, password: string) {
    return this.api.post<VeniceRcon.TokenResponse>()
      .path(`/auth/login`)
      .body({ username, password })
      .intercept((res, { token }) => this.api.updateToken(token))
      .send()
  }

  useInviteToken(token: string) {
    return this.api.post()
      .path("/auth/invite")
      .body({ token })
      .send()
  }

  register(username: string, password: string, token: string) {
    return this.api.post<VeniceRcon.TokenResponse>()
      .path("/auth/invite")
      .body({ username, password, token })
      .send()
  }

  forgotPassword(email: string) {
    return this.api.post()
      .path("/auth/forgot-password")
      .body({ email })
      .send()
  }

  logout() {
    this.api.updateToken(null)
  }

  whoami() {
    return this.api.get<VeniceRcon.WhoamiResponse>().path("/auth/whoami").send()
  }

  updateSelf(currentPassword: string, props: VeniceRcon.UpdateUserProps) {
    return this.api.post()
      .path("/auth/update-self")
      .body({ ...props, currentPassword })
      .send()
  }

  playerBinds() {
    return this.api.get<VeniceRcon.PlayerType[]>()
      .path("/auth/binding")
      .send()
  }

  playerSearch(name?: string, guid?: string) {
    return this.api.post<VeniceRcon.PlayerType[]>()
      .path("/auth/search-player")
      .body({ name, guid })
      .send()
  }

  playerBind(playerId: number) {
    return this.api.post<VeniceRcon.PlayerType[]>()
      .path("/auth/binding")
      .body({ playerId })
      .send()
  }

  playerUnbind(id: number) {
    return this.api.delete<void>()
      .path("/auth/binding/:id", { id })
      .send()
  }

  users() {
    return this.api.get<VeniceRcon.Users>()
      .path("/users")
      .send()
  }

  getUser(id: number) {
    return this.api.get<VeniceRcon.User>()
      .path("/users/:id", { id })
      .send()
  }

  deleteUser(id: number) {
    return this.api.delete<void>()
      .path("/users/:id", { id })
      .send()
  }

  patchUser(id: number, props: VeniceRcon.UpdateUserProps) {
    return this.api.delete<VeniceRcon.User>()
      .path("/users/:id", { id })
      .body(props)
      .send()
  }

  userAddPermission(id: number, props: VeniceRcon.AddPermissionProps) {
    return this.api.post<VeniceRcon.User>()
      .path("/users/:id/permissions", { id })
      .body(props)
      .send()
  }

  userDelPermission(id: number, permId: number) {
    return this.api.delete<VeniceRcon.User>()
      .path("/users/:id/permissions/:permId", { id, permId })
      .send()
  }

  userUpdatePermission(id: number, permId: number, scopes: string[]) {
    return this.api.patch<VeniceRcon.User>()
      .path("/users/:id/permissions/:permId", { id, permId })
      .body({ scopes })
      .send()
  }

  createUser(username: string, password: string) {
    return this.api.post<VeniceRcon.User>()
      .path("/users")
      .body({ username, password })
      .send()
  }

  repositories() {
    return this.api.get<VeniceRcon.Repositories>()
      .path("/repository")
      .send()
  }

  getRepository(id: number) {
    return this.api.get<VeniceRcon.Repository>()
      .path("/repository/:id", { id })
      .send()
  }

  createRepository(props: VeniceRcon.CreateRepositoryProps) {
    return this.api.post<VeniceRcon.Repository>()
      .path("/repository")
      .body(props)
      .send()
  }

  deleteRepository(id: number) {
    return this.api.delete<void>()
      .path("/repository/:id", { id })
      .send()
  }

  updateRepository(id: number, props: VeniceRcon.UpdateRepositoryProps) {
    return this.api.patch<VeniceRcon.Repository>()
      .path("/repository/:id", { id })
      .body(props)
      .send()
  }

  instances() {
    return this.api.get<VeniceRcon.Instances>()
      .path("/instances")
      .send()
  }

  getInstance(id: number) {
    return this.api.get<VeniceRcon.Instance>()
      .path("/instances/:id", { id })
      .send()
  }

  updateInstance(id: number, props: VeniceRcon.UpdateInstanceProps) {
    return this.api.patch<VeniceRcon.Instance>()
      .path("/instances/:id", { id })
      .body(props)
      .send()
  }

  deleteInstance(id: number) {
    return this.api.delete<void>()
      .path("/instances/:id", { id })
      .send()
  }

  startInstance(id: number) {
    return this.api.patch<void>()
      .path("/instances/:id/start", { id })
      .send()
  }

  stopInstance(id: number) {
    return this.api.patch<void>()
      .path("/instances/:id/stop", { id })
      .send()
  }

  rawCommand(id: number, words: string[]) {
    return this.api.post<string[]>()
      .path("/instances/:id/raw", { id })
      .body({ words })
      .send()
  }

  messagePlayers(id: number, props: VeniceRcon.MessagePlayerProps) {
    return this.api.post<void>()
      .path("/instances/:id/message", { id })
      .body(props)
      .send()
  }

  setTicketCount(id: number, props: VeniceRcon.SetTeamTicketCountProps) {
    return this.api.patch<void>()
      .path("/instances/:id/teamtickets", { id })
      .body(props)
      .send()
  }

  instanceUsers(id: number) {
    return this.api.get<VeniceRcon.InstanceUsers>()
      .path("/instances/:id/users", { id })
      .send()
  }

  getInstanceUser(id: number, userId: number) {
    return this.api.get<VeniceRcon.InstanceUser>()
      .path("/instances/:id/users/:userId", { id, userId })
      .send()
  }

  deleteInstanceUser(id: number, userId: number) {
    return this.api.delete<void>()
      .path("/instances/:id/users/:userId", { id, userId })
      .send()
  }

  updateInstanceUserPermissions(id: number, userId: number, scopes: string[]) {
    return this.api.patch<VeniceRcon.InstanceUser>()
      .path("/instances/:id/users/:userId/permissions", { id, userId })
      .body({ scopes })
      .send()
  }

  instanceUserInvites(id: number) {
    return this.api.get<VeniceRcon.InstanceUsers>()
      .path("/instances/:id/users/invites", { id })
      .send()
  }

  createInstanceUserInvite(id: number, scopes: string[]) {
    return this.api.post<{ token: string }>()
      .path("/instances/:id/users/invites", { id })
      .body({ scopes })
      .send()
  }

  instancePlayers(id: number) {
    return this.api.get<VeniceRcon.InstancePlayers>()
      .path("/instances/:id/players", { id })
      .send()
  }

  getInstancePlayer(id: number, guid: string) {
    return this.api.get<VeniceRcon.InstancePlayer>()
      .path("/instances/:id/players/:guid", { id, guid })
      .send()
  }

  moveInstancePlayer(id: number, guid: string, props: VeniceRcon.InstancePlayerMoveProps) {
    return this.api.post<void>()
      .path("/instances/:id/players/:guid/move", { id, guid })
      .body(props)
      .send()
  }

  messageInstancePlayer(id: number, guid: string, props: VeniceRcon.InstancePlayerMessageProps) {
    return this.api.post<void>()
      .path("/instances/:id/players/:guid/message", { id, guid })
      .body(props)
      .send()
  }

  banInstancePlayer(id: number, guid: string, props: VeniceRcon.InstancePlayerBanProps) {
    return this.api.post<void>()
      .path("/instances/:id/players/:guid/ban", { id, guid })
      .body(props)
      .send()
  }

  kickInstancePlayer(id: number, guid: string, props: VeniceRcon.InstancePlayerKickProps) {
    return this.api.post<void>()
      .path("/instances/:id/players/:guid/kick", { id, guid })
      .body(props)
      .send()
  }

  killInstancePlayer(id: number, guid: string, props: VeniceRcon.InstancePlayerKillProps) {
    return this.api.post<void>()
      .path("/instances/:id/players/:guid/kill", { id, guid })
      .body(props)
      .send()
  }

  instanceBans(id: number) {
    return this.api.get<VeniceRcon.Bans>()
      .path("/instances/:id/bans", { id })
      .send()
  }

  createInstanceBan(id: number, props: VeniceRcon.InstanceBanCreateProps) {
    return this.api.post<void>()
      .path("/instances/:id/bans", { id })
      .body(props)
      .send()
  }

  deleteInstanceBan(id: number, props: VeniceRcon.InstanceBanDeleteProps) {
    return this.api.delete<void>()
      .path("/instances/:id/bans/:subset/:subsetId", { id, ...props })
      .send()
  }

  instanceMaps(id: number) {
    return this.api.get<VeniceRcon.Maps>()
      .path("/instances/:id/maps", { id })
      .send()
  }

  addInstanceMap(id: number, props: VeniceRcon.InstanceMapCreateProps) {
    return this.api.post<VeniceRcon.Maps>()
      .path("/instances/:id/maps", { id })
      .body(props)
      .send()
  }

  getInstanceMapInfo(id: number) {
    return this.api.get<VeniceRcon.MapInfo>()
      .path("/instances/:id/maps/current", { id })
      .send()
  }

  instanceMapEndRound(id: number) {
    return this.api.post<void>()
      .path("/instances/:id/maps/endRound", { id })
      .send()
  }

  instanceMapNextRound(id: number) {
    return this.api.post<void>()
      .path("/instances/:id/maps/nextRound", { id })
      .send()
  }

  instanceMapRestartRound(id: number) {
    return this.api.post<void>()
      .path("/instances/:id/maps/restartRound", { id })
      .send()
  }

  getInstanceMap(id: number, index: number) {
    return this.api.post<VeniceRcon.Map>()
      .path("/instances/:id/maps/:index", { id, index })
      .send()
  }

  deleteInstanceMap(id: number, index: number) {
    return this.api.delete<void>()
      .path("/instances/:id/maps/:index", { id, index })
      .send()
  }

  setNextInstanceMap(id: number, index: number) {
    return this.api.post<void>()
      .path("/instances/:id/maps/:index/next", { id, index })
      .send()
  }

  moveInstanceMap(id: number, index: number, toIndex: number) {
    return this.api.post<void>()
      .path("/instances/:id/maps/:index/position/:toIndex", { id, index, toIndex })
      .send()
  }

  instanceReservedSlots(id: number) {
    return this.api.get<VeniceRcon.ReservedSlots>()
      .path("/instances/:id/reservedslot", { id })
      .send()
  }

  addInstanceReservedSlot(id: number, name: string) {
    return this.api.post<void>()
      .path("/instances/:id/reservedslot", { id })
      .body({ name })
      .send()
  }

  deleteInstanceReservedSlot(id: number, name: string) {
    return this.api.delete<void>()
      .path("/instances/:id/reservedslot/:name", { id, name })
      .send()
  }

  instanceVariables(id: number) {
    return this.api.get<VeniceRcon.Variables>()
      .path("/instances/:id/vars", { id })
      .send()
  }

  updateInstanceVariables(id: number, props: VeniceRcon.Variables) {
    return this.api.patch<void>()
      .path("/instances/:id/vars", { id })
      .body(props)
      .send()
  }

  instanceVariableOptions(id: number) {
    return this.api.get<VeniceRcon.VariableOptions>()
      .path("/instances/:id/vars/options", { id })
      .send()
  }

  instanceEventKills(id: number) {
    return this.api.get<VeniceRcon.KillEvents>()
      .path("/instances/:id/kill", { id })
      .send()
  }

  instanceEventChatMessages(id: number) {
    return this.api.get<VeniceRcon.ChatMessageEvents>()
      .path("/instances/:id/chat", { id })
      .send()
  }

  instanceMods(id: number) {
    return this.api.get<VeniceRcon.Mods>()
      .path("/instances/:id/mods", { id })
      .send()
  }

  instanceModsReload(id: number) {
    return this.api.patch<void>()
      .path("/instances/:id/mods/reload", { id })
      .send()
  }

  instanceModsClear(id: number) {
    return this.api.patch<void>()
      .path("/instances/:id/mods/clear", { id })
      .send()
  }

  instanceModEnable(id: number, mod: string) {
    return this.api.post<void>()
      .path("/instances/:id/mods/:mod", { id, mod })
      .send()
  }

  instanceModDisable(id: number, mod: string) {
    return this.api.delete<void>()
      .path("/instances/:id/mods/:mod", { id, mod })
      .send()
  }

  instanceLogs(id: number) {
    return this.api.get<VeniceRcon.LogMessages>()
      .path("/instances/:id/logs/instance", { id })
      .send()
  }

  instancePluginLogs(id: number, plugin: string = "") {
    return this.api.get<VeniceRcon.LogMessages>()
      .path("/instances/:id/logs/plugins/:plugin", { id, plugin })
      .send()
  }

  instancePlugins(id: number) {
    return this.api.get<VeniceRcon.InstancePlugins>()
      .path("/instances/:id/plugins", { id })
      .send()
  }

  instancePluginStart(id: number, pluginId: number) {
    return this.api.post<void>()
      .path("/instances/:id/plugins/:pluginId/start", { id, pluginId })
      .send()
  }

  instancePluginStop(id: number, pluginId: number) {
    return this.api.post<void>()
      .path("/instances/:id/plugins/:pluginId/start", { id, pluginId })
      .send()
  }

  instancePluginUpdateConfig(id: number, pluginId: number, config: Record<string, any>) {
    return this.api.patch<void>()
      .path("/instances/:id/plugins/:pluginId/config", { id, pluginId })
      .body(config)
      .send()
  }

  deleteInstancePlugin(id: number, uuid: string) {
    return this.api.delete<void>()
      .path("/instances/:id/plugins/:uuid", { id, uuid })
      .send()
  }

  instancePluginStore(id: number) {
    return this.api.get<VeniceRcon.RepositoryPlugins>()
      .path("/instances/:id/plugins/store", { id })
      .send()
  }

  instancePluginStoreDownload(id: number, uuid: string) {
    return this.api.post<VeniceRcon.RepositoryPlugins>()
      .path("/instances/:id/plugins/store/:uuid", { id, uuid })
      .send()
  }

}

export namespace VeniceRcon {
  export interface Props {
    host: string
    token?: string
    onToken?: Api.OnToken
  }

  export enum InstanceState {
    UNKNOWN = 0,
    CONNECTING = 1,
    CONNECTED = 2,
    DISCONNECTING = 3,
    DISCONNECTED = 4,
    RECONNECTING = 5,
    RECONNECTING_FAILED = 6
  }

  export enum Subset {
    SQUAD = "squad",
    TEAM = "team",
    PLAYER = "player",
    ALL = "all"
  }

  export type UpdateUserProps = {
    email: string|null
    password: string|null
  }

  export type Permission = {
    id: number,
    instance: number|null,
    root: boolean,
    scopes: string[]
  }

  export type TokenResponse = {
    token: string
  }

  export type JWTToken = {
    v: number
    id: number,
    username: string,
    iat: number
  }

  export type PlayerType = {
    id: number
    guid: string
    name: string
  }

  export type WhoamiResponse = {
    email: string|null
    permissions: Permission[]
    token: JWTToken
  }

  export type Users = User[] 

  export type User = {
    id: number
    created: string
    modified: string
    username: string
    email: string|null
    permissions: Permission[]
  }

  export type AddPermissionProps = {
    root: boolean
    instanceId?: number
    scopes: string[]
  }

  export type Repositories = Repository[] 

  export type Repository = {
    id: number
    created: number
    modified: number
    type: string
    url: string
    branch: string
    headers: string
    enabled: boolean
    reloadTime: number
    repositoryUrl: string
    plugins: RepositoryPlugins
  }

  export type RepositoryPlugins = RepositoryPlugin[]
  export type RepositoryPlugin = {
    name: string
    description: string
    version: string
    uuid: string
  }

  export type CreateRepositoryProps = {
    url: string,
    branch?: string,
    headers?: string
  }

  export type UpdateRepositoryProps = {
    url?: string,
    branch?: string,
    headers?: string,
    enabled?: true
  }

  export type Instances = Instance[]
  
  export type Instance = {
    id: number
    host: string
    port: number
    state: InstanceState
    serverinfo: ServerInfo
    players: Record<string, Player>
    maps: Maps
    version: "BF3"|"VU"
    vars: Record<string, string>
    mapInfo: MapInfo
  }

  export type ServerInfo = {
    name: string
    slots: number
    totalSlots: number
    mode: string
    map: string
    roundsPlayed: number
    roundsTotal: number
    scores: number[]
    targetScore: number
    onlineState: string
    ranked: boolean
    punkBuster: boolean
    password: boolean
    uptime: number
    roundTime: number
    address: string
    punkBusterVersion: string
    joinQueueEnabled: boolean
    region: string
    closestPingSite: string
    country: string
    matchmaking: boolean
  }

  export type Player = {
    //@todo
  }

  export type MapInfo = {
    index: number
    next: number
  }

  export type Maps = Map[]

  export type Map = {
    map: string
    mode: string
    rounds: number
    index: number
  }

  export type UpdateInstanceProps = {
    host: string
    port: string
    password: string
  }

  export type MessagePlayerProps = {
    message: string
    subset: Subset
    subsetId?: string
    yell?: true
    yellDuration?: number
  }

  export type SetTeamTicketCountProps = {
    team: number
    count: number
  }

  export type InstanceUsers = InstanceUser[]

  export type InstanceUser = {
    permId: number,
    userId: number,
    modified: string
    created: string
    username: string
    scopes: string[]
  }

  export type InstanceInvites = InstanceInvite[]

  export type InstanceInvite = {
    id: 0
    created: string
    modified: string
    token: string,
    issuer: {
      id: 0
      username: string
    },
    user?: {
      id: 0
      username: string
    }
    instanceId: 0
  }

  export type InstancePlayers = InstancePlayer[]

  export type InstancePlayer = {
    name: string
    guid: string
    playerGuid?: string
    teamId: number
    squadId: number
    kills: number
    deaths: number
    score: string
    rank: string
    ping: number
    spectator: number
    ip: string
  }

  export type InstancePlayerMoveProps = {
    teamId: number
    squadId: number
    kill: boolean
  }

  export type InstancePlayerMessageProps = {
    subset: Subset.SQUAD|Subset.TEAM|Subset.PLAYER,
    message: string,
    yell?: boolean,
    yellDuration?: number
  }

  export type InstancePlayerBanProps = {
    subset: "guid"|"name"|"ip"
    message: string
    yell?: boolean
    yellDuration?: number
  }

  export type InstancePlayerKickProps = {
    reason: string
  }

  export type InstancePlayerKillProps = {
    reason: string
  }

  export type Bans = Ban[]
  
  export type Ban = {
    subset: string[]
    reason: string
    timeout: any
  }

  export type InstanceBanCreateProps = {
    subset: ["guid"|"name"|"ip", string]
    reason: string
    durationType: "rounds"|"seconds"|"perm"
    duration: number
  }

  export type InstanceBanDeleteProps = {
    subset: "guid"|"name"|"ip"
    subsetId: string
  }

  export type InstanceMapCreateProps = {
    map: string
    mode: string
    rounds: number
    index?: number
  }
  
  export type ReservedSlots = string[]

  export type Variables = {
    [key: string]: string
  }

  export type VariableOptions = {
    getters: string[]
    setters: string[]
  }

  export type KillEvents = KillEvent[]

  export type KillEvent = {
    id: number
    instance: number
    weapon: string
    headshot: boolean
    created: string
    killer?: PlayerSource
    killed: PlayerSource
  }

  export type ChatMessageEvents = KillEvent[]

  export type ChatMessageEvent = {
    id: number
    instance: number
    message: string
    subset: Subset
    created: string
    player: PlayerSource
  }

  export type PlayerSource = {
    name: string
    guid: string
  }

  export type Mods = {
    available: string[],
    running: string[],
    next: string[]
  }

  export type LogMessages = LogMessage[]

  export type LogMessage = {
    instanceId: number
    message: string
    level: string
    source: number
    sourceLocation: number
    created: string
  }
  
  export type InstancePlugins = InstancePlugin[]

  export type InstancePlugin = {
    id: number
    storeVersion: string
    uuid: string
    name: string
    state: number
    meta: InstancePluginMeta
    config: Record<string, any>
  }

  export type InstancePluginMeta = {
    name: string
    description: string
    version: string
    backend: string
    entry: string
    dependency: string[]
    vars: VariableConfig[]
  }

  export type VariableConfig = {
    name: string
    description: string
    type: "string"|"number"|"boolean"|"strings"|"select"|"array"
    multiline?: boolean
    default: any
    options?: string[]
    conditions: VariableCondition
    vars?: VariableConfig
  }

  export type VariableCondition = {
    //@todo
  }
}