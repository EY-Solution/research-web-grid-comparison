<template>
  <VApp>
    <VContainer>
      <h1>web grid comparison</h1>
      <VTable class="mt-10 list-table" density="compact">
        <thead>
          <tr>
            <th>제목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><NuxtLink to="/wijmo">Wijmo</NuxtLink></td>
            <td>Wijmo Grid의 성능 측정 페이지</td>
          </tr>

          <tr>
            <td><NuxtLink to="/kendo">Kendo UI</NuxtLink></td>
            <td>Kendo UI Grid의 성능 측정 페이지</td>
          </tr>
        </tbody>
      </VTable>
    </VContainer>
  </VApp>
</template>
<style lang="scss" scoped>
.list-table.v-table {
  margin-top: 20px;
  --v-table-header-height: 35px;

  thead {
    tr {
      th {
        border-bottom: 1px solid rgb(25, 116, 177);
        border-top: 1px solid rgb(25, 116, 177);
        text-align: center;
        color: #333;
        font-weight: 700;
      }
    }
  }
}
</style>
