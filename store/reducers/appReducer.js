import { EXPERT, LEARNER } from '../../constants'

const {
  CHANGE_USER_TYPE,
  FETCH_SERVICES,
  FETCH_VIEW_SERVICE,
  SET_CURRENT_PROFILE,
  LOGOUT,
  FETCH_SEARCH_RESULTS,
  FETCH_USER_SERVICES,
  SET_PROVIDER_ID,
  FETCH_PROVIDER_SERVICES,
} = require('../actionTypes')

const initialState = {
  // userType: LEARNER,
  userType: LEARNER,
  services: [],
  nextServicePageUrl: null,
  // previousServicePageURL: null,
  initialServiceFetched: false,
  providerService: [],
  nextProviderServiceUrl: null,
  // previousProviderServiceUrl: null,
  intialProviderServiceFetched: false,
  viewServiceData: null,
  currentProfile: null,
  searchResults: [],
  nextSearchResultUrl: null,
  userServices: [],
  nextUserServicesUrl: null,
  // previousUserServicesUrl: null,
  initialUserServicesFetched: false,
  providerId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_TYPE:
      return {
        ...state,
        userType: action.newType,
      }
    case FETCH_SERVICES:
      const newService = [...state.services, ...action.services]

      return {
        ...state,
        services: newService,
        nextServicePageUrl: action.nextURL,
        // previousServicePageURL: action.previousURL,
        initialServiceFetched: action.initialFetch,
      }
    case FETCH_PROVIDER_SERVICES:
      const newServices = [...state.providerService, ...action.services]

      return {
        ...state,
        providerService: newServices,
        nextProviderServiceUrl: action.nextURL,
        // previousProviderServiceUrl: action.previousURL,
        intialProviderServiceFetched: action.initialFetch,
      }
    case FETCH_USER_SERVICES:
      const newUserServices = [...state.userServices, ...action.services]
      return {
        ...state,
        userServices: newUserServices,
        nextUserServicesUrl: action.nextURL,
        // previousUserServicesUrl: action.previousURL,
        initialUserServicesFetched: action.initialFetch,
      }
    case FETCH_VIEW_SERVICE:
      return {
        ...state,
        viewServiceData: action.data,
      }
    case SET_CURRENT_PROFILE:
      localStorage.setItem('currentProfile', action.id)
      return {
        ...state,
        currentProfile: action.id,
      }
    case LOGOUT:
      localStorage.removeItem('currentProfile')
      localStorage.removeItem('token')
      return {
        ...state,
        currentProfile: null,
      }
    case FETCH_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.results,
        nextSearchResultUrl: action.nextURL,
      }
    case SET_PROVIDER_ID:
      return {
        ...state,
        providerId: action.id,
      }
    default:
      return state
  }
}

export default reducer
