const PATH_UPDATE = 'map/PATH_UPDATE';
const PATH_ERASE = 'map/PATH_ERASE';

const initialState = {
  region: 'map',
  // taipei
  defaultCenter: {
    lat: 25.0338,
    lng: 121.5644,
  },
  path: [],
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
        region: 'map',
        path: []
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
