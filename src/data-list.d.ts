import Vue, {VueConstructor} from 'vue'

declare module '@femessage/data-list' {
  class FemessageComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type DataListData = {
    treeData: any
    filterText: string
    loading: boolean
    dialogTitle: string
    dialogVisible: boolean
    isNew: boolean
    isEdit: boolean
    confirmLoading: boolean
    row: object
    defaultExpandedKeys: any[]
    cacheExpandedKeys: any
    isCollapsed: boolean
  }

  type DataListMethods = {
    reset: () => void
  }

  type DataListComputed = {}

  type DataListProps = {
    url: string
    query: object
    dataPath: string
    totalPagesPath: string
    size: number
    hasPagination: boolean
    noPaginationSize: number
    saveQuery: boolean
    throwCustomError: (resp: any) => void
  }

  type DataList = Combined<
    DataListData,
    DataListMethods,
    DataListComputed,
    DataListProps
  >

  export interface DataListType extends FemessageComponent, DataList {}

  const DataListConstruction: ExtendedVue<
    Vue,
    DataListData,
    DataListMethods,
    DataListComputed,
    DataListProps
  >

  export default DataListConstruction
}
