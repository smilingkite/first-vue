import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function toTags (array) {
  array.sort()
  var tagArray = Object.values(array.reduce((resultTagArr, tag) => {
    if (!resultTagArr[tag]) {
      resultTagArr[tag] = {name: tag, count: 1}
      // gives array of named objects: tagName: {name: tag, count: 1}
    } else { resultTagArr[tag]['count'] += 1 }
    return resultTagArr
  }, {}))
  return tagArray
}
function filterTags (tagArray) {
  var commontags = ['', 
  'a',  'an', 'and', 'as', 'are', 'at',
  'but', 'be', 'by',
  'can',
  'don', 
  'every',
  'for', 
  'had', 'has', 'have',
  'is', 'in', 'it', 'if', 'i',
  'like',
  'me', 'my',
  'of', 'on', 'or',
  'so',
  'the',  'that', 'this', 'to', 't', 'then',
  'you', 'your',
  'what', 'which', 'with', 'was', 'were', 'we'
  ]
  return tagArray.filter(tagObject => {
    return !commontags.includes(tagObject.name)
  })
}
function maxTags (tagArray, c) {
  if (tagArray.length < 10) return tagArray
  tagArray = tagArray.filter(tagObject => {
    return tagObject.count > c 
  })
  return tagArray
}

export default new Vuex.Store({
 state: {
  tags: [],
  count: 1, 
 },
 mutations: {
  GET_TAGS (state, tags) {
    var count = state.count
    tags = maxTags(filterTags(toTags(tags)), count)
    state.tags = tags
  },
  INCREMENT (state) {
    state.count++;
  },
  DECREMENT (state) {
    if(state.count > 0){
      state.count-- ;
    }
  }
 },
 actions: {
  gettags({commit}, tags){
    commit('GET_TAGS', tags)
  },
  increment({commit},count){
    commit('INCREMENT', count)
  },
  decrement({commit},count){
    commit('DECREMENT', count)
  }
 },
 getters: {
  tags: state => state.tags,
  count: state => state.count
 }

})