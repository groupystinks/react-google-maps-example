const PATH_UPDATE = 'map/PATH_UPDATE';
const PATH_ERASE = 'map/PATH_ERASE';

const initialState = {
  region: 'map',
  path: [
    { lat: 25.033, lng: 121.565 },
    { lat: 25.043, lng: 121.575 },
    { lat: 25.043, lng: 121.575 },
    { lat: 25.033, lng: 121.565 }
  ],
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
