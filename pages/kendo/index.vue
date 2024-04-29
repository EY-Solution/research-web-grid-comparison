<template>
  <div>
    <div class="ma-5">
      <VBtn variant="flat" color="blue" @click="() => pagination.loadData()">Load Data</VBtn>
    </div>
    <VSheet color="orange" class="pa-5" v-if="pagination.measurement.duration.value > 0">
      Draw : {{ pagination.measurement.duration.value }} ms</VSheet
    >
    <div class="ma-5">
      <Grid
        style="height: 600px"
        :columns="columns"
        :dataItems="pagination.gridData.value"
        :columnVirtualization="true"
        :pageable="true"
        :total="pagination.totalRecords.value"
        :skip="pagination.skip.value"
        :take="pagination.take.value"
        dataItemKey="rowIndex"
        :pageSize="500"
        :rowHeight="40"
        @pagechange="pagination.onPageChange"
      >
      </Grid>
    </div>

    <div class="ma-5">
      <VBtn variant="flat" color="yellow" @click="() => bigData.loadData()" class="ml-2">Load 5,000 Rows Data</VBtn>
    </div>
    <VSheet color="orange" class="pa-5" v-if="bigData.measurement.duration.value > 0"> Draw : {{ bigData.measurement.duration.value }} ms</VSheet>
    <div class="ma-5">
      <Grid
        style="height: 600px"
        :columns="columns"
        :dataItems="bigData.displayGridData.value"
        scrollable="virtual"
        :columnVirtualization="true"
        :total="bigData.totalRecords.value"
        :skip="bigData.skip.value"
        :take="bigData.take.value"
        dataItemKey="rowIndex"
        :pageSize="bigData.take.value"
        :rowHeight="40"
        @pagechange="bigData.onPageChange"
      >
      </Grid>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Grid } from '@progress/kendo-vue-grid'

const columns = ref(createCloumns())
function createCloumns() {
  const columns = []
  for (let i = 0; i < 50; i++) {
    columns.push({
      field: `col${i + 1}`,
      title: `Column${i + 1}`,
      minWidth: 100,
      width: 100,
    })
  }
  return columns
}

const pagination = (() => {
  const gridData = ref<any[]>([])
  const currentPageNo = ref(0)
  const totalRecords = ref(0)
  const skip = ref(0)
  const take = ref(50)
  const measurement = useMeasurement()

  async function loadData(page: number = 1) {
    const result = await $fetch<{ totalRecords: number; list: any[] }>('/api/pagination-data', {
      params: {
        page,
      },
    })
    currentPageNo.value = page
    measurement.start()
    gridData.value = result.list
    totalRecords.value = result.totalRecords
    nextTick(() => measurement.end())
  }

  function onPageChange(event) {
    skip.value = event.page.skip
    take.value = event.page.take

    loadData(skip.value / take.value + 1)
  }

  watch(currentPageNo, (v, o) => {
    // if (v < 1) {
    //   cv.sourceCollection = []
    //   _lastScrollPositon = { x: -0, y: -0 }
    //   return
    // }
    // if (o < 1) {
    //   return
    // }
    // loadData(v)
  })

  return {
    gridData,
    skip,
    take,
    totalRecords,
    loadData,
    onPageChange,
    measurement,
  }
})()

const bigData = (() => {
  const gridData = ref<any[]>([])
  const skip = ref(0)
  const take = ref(20)
  const displayGridData = computed(() => {
    return !gridData.value ? [] : gridData.value.slice(skip.value, skip.value + take.value)
  })
  const totalRecords = ref(0)
  const measurement = useMeasurement()

  async function loadData() {
    const result = await $fetch<any[]>('/api/big-data')

    measurement.start()
    gridData.value = result
    totalRecords.value = gridData.value.length

    nextTick(() => measurement.end())
  }

  function onPageChange(event) {
    measurement.start()
    skip.value = event.page.skip
    take.value = event.page.take

    nextTick(() => measurement.end())
  }

  return {
    displayGridData,
    skip,
    take,
    totalRecords,
    gridData,
    loadData,
    onPageChange,
    measurement,
  }
})()
</script>
