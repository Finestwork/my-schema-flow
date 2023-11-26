import {defineStore} from "pinia";

export const useTableStore = defineStore('tableStore', {
  state: ()=>({
    elements: []
  })
});
