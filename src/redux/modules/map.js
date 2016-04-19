const PATH_UPDATE = 'map/PATH_UPDATE';
const PATH_ERASE = 'map/PATH_ERASE';

const RENDER_MARKER = 'map/RENDER_MARKER';

const initialState = {
  isMarkerReady: false,
  // taipei
  defaultCenter: {
    lat: 25.0338,
    lng: 121.5644,
  },
  path: [],
  region: 'map',
  markers: [
    {
      position: {
        lat: 25.043,
        lng: 121.565
      },
      key: 'groupystinks',
      name: 'Jason',
    },
    {
      position: {
        lat: 25.053,
        lng: 121.555
      },
      key: 'hotdogs520',
      name: 'MChotdog',
    },
    {
      position: {
        lat: 25.0338,
        lng: 121.5644
      },
      key: 'taipei101',
      name: 'taipei101',
    },
    {
      position: {
        lat: 24.9900,
        lng: 121.5092
      },
      key: 'nanshijiao',
      name: 'nanshijiao',
    },
    {
      position: {
        lat: 25.0830,
        lng: 121.5572
      },
      key: 'meilihua',
      name: 'meilihua',
    }
  ]
};

export default function map(state = initialState, action = {}) {
  switch (action.type) {
    case PATH_UPDATE:
      return {
        ...state,
        region: 'draw',
        path: action.path
      };
    case PATH_ERASE:
      return {
        ...state,
        isMarkerReady: false,
        region: 'map',
        path: []
      };
    case RENDER_MARKER:
      return {
        ...state,
        isMarkerReady: true
      };
    default:
      return state;
  }
}

export function updatePath(path) {
  return {
    type: PATH_UPDATE,
    path
  };
}

export function erasePath() {
  return {
    type: PATH_ERASE
  };
}

export function renderMarker() {
  return {
    type: RENDER_MARKER
  };
}
