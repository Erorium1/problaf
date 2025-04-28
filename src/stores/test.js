import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore('test', () => {
  const testResults = ref({
    block1: {},
    block2: {},
    block3: {},
    block4: {},
    block5: {}
  })

  // Загрузка данных из localStorage при инициализации
  const loadFromStorage = () => {
    const savedResults = localStorage.getItem('testResults')
    if (savedResults) {
      testResults.value = JSON.parse(savedResults)
    }
  }

  // Сохранение данных в localStorage
  const saveToStorage = () => {
    localStorage.setItem('testResults', JSON.stringify(testResults.value))
  }

  // Сохранение результатов блока
  const saveBlockResults = (blockNumber, results) => {
    testResults.value[`block${blockNumber}`] = results
    saveToStorage()
  }

  // Очистка всех результатов
  const clearResults = () => {
    testResults.value = {
      block1: {},
      block2: {},
      block3: {},
      block4: {},
      block5: {}
    }
    localStorage.removeItem('testResults')
  }

  // Проверка, все ли блоки заполнены
  const isAllBlocksFilled = () => {
    return Object.values(testResults.value).every(block => 
      Object.keys(block).length > 0
    )
  }

  // Инициализация при создании store
  loadFromStorage()

  return {
    testResults,
    saveBlockResults,
    clearResults,
    isAllBlocksFilled
  }
}) 