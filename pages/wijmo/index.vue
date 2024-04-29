<template>
  <div>
    <div class="ma-5">
      <VBtn variant="flat" color="blue" @click="() => pagination.loadData()">Load Data</VBtn>
    </div>
    <VSheet color="orange" class="pa-5" v-if="pagination.measurement.duration.value > 0">
      Draw : {{ pagination.measurement.duration.value }} ms</VSheet
    >
    <div class="ma-5">
      <WjFlexGrid style="height: 600px" :initialized="pagination.initialize" :refreshed="pagination.measurement.end">
        <WjFlexGridColumn :binding="`col${idx}`" :header="`Colum${idx}`" :width="100" v-for="idx in 50" />
      </WjFlexGrid>
    </div>

    <div class="ma-5">
      <VBtn variant="flat" color="yellow" @click="() => bigData.loadData()" class="ml-2">Load 50,000 Rows Data</VBtn>
    </div>
    <VSheet color="orange" class="pa-5" v-if="bigData.measurement.duration.value > 0"> Draw : {{ bigData.measurement.duration.value }} ms</VSheet>
    <div class="ma-5">
      <WjFlexGrid style="height: 600px" :initialized="bigData.initialize" :refreshed="bigData.measurement.end">
        <WjFlexGridColumn :binding="`col${idx}`" :header="`Colum${idx}`" :width="100" v-for="idx in 50" />
      </WjFlexGrid>
    </div>
  </div>
</template>
<script setup lang="ts">
import { WjFlexGrid, WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid'
import { FlexGrid } from '@grapecity/wijmo.grid'
import { CollectionView } from '@grapecity/wijmo'

const pagination = (() => {
  const flexGrid = shallowRef<FlexGrid>()
  const cv = new CollectionView()
  const currentPageNo = ref(0)
  const totalRecords = ref(0)
  const measurement = useMeasurement()

  async function loadData(page: number = 1) {
    const result = await $fetch<{ totalRecords: number; list: any[] }>('/api/pagination-data', {
      params: {
        page,
      },
    })
    currentPageNo.value = page
    measurement.start()
    if (page === 1) {
      cv.sourceCollection = result.list
    } else {
      cv.sourceCollection.push(...result.list)
    }
    totalRecords.value = result.totalRecords
    cv.refresh()
  }

  watch(currentPageNo, (v, o) => {
    if (v < 1) {
      cv.sourceCollection = []
      _lastScrollPositon = { x: -0, y: -0 }
      return
    }

    if (o < 1) {
      return
    }

    loadData(v)
  })

  let _lastScrollPositon: { x: number; y: number } = { x: -0, y: -0 }

  return {
    totalRecords,
    loadData,
    initialize(grid: FlexGrid) {
      flexGrid.value = grid
      flexGrid.value.itemsSource = cv

      flexGrid.value.scrollPositionChanged.addHandler(s => {
        if (_lastScrollPositon && _lastScrollPositon.y <= s.scrollPosition.y) {
          _lastScrollPositon = s.scrollPosition
          return
        }

        _lastScrollPositon = s.scrollPosition

        if (currentPageNo.value < 1) {
          return
        }

        if (s.viewRange.bottomRow >= s.rows.length - 1) {
          currentPageNo.value++
        }
      })
    },
    measurement,
  }
})()

const bigData = (() => {
  const flexGrid = shallowRef<FlexGrid>()
  const cv = new CollectionView()
  const measurement = useMeasurement()

  async function loadData() {
    const result = await $fetch<any[]>('/api/big-data')

    measurement.start()
    cv.sourceCollection = result
    cv.refresh()
  }

  return {
    cv,
    loadData,
    initialize(grid: FlexGrid) {
      flexGrid.value = grid
      flexGrid.value.itemsSource = cv
    },
    measurement,
  }
})()
</script>
