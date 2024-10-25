const start_point = 101;
const start_state = "VI";
const end_point = 80000;
const end_state = "FL";

const states = {
  9750: "NC",
  21383: "SC",
  37685: "GA",
  68758: "FL",
};

const stateData = Array(end_point + 1).fill("");

const initStateData = () => {
  const points = Object.keys(states);
  let current_point = start_point;
  let current_state = start_state;
  for (let i = 0; i < points.length; i++) {
    for (let j = current_point; j < points[i]; j++) {
      stateData[j] = current_state;
    }
    current_point = Number(points[i]);
    current_state = states[points[i]];
  }
  for (let i = current_point; i <= end_point; i++) {
    stateData[i] = current_state;
  }
};

let call_count = 0;

const getStateByPosition = (location) => {
  call_count++;
  if (location < start_point || location > end_point) {
    return -1;
  }
  return stateData[location];
};

// Initialize virtual state data
initStateData();

const recursiveStateCalc = (start, startState, end, endState) => {
  const center = Math.floor((start + end) / 2);
  const centerState = getStateByPosition(center);

  if (center === start) {
    return { position: end, state: endState };
  }

  if (startState === centerState) {
    // should search right side
    return recursiveStateCalc(center, centerState, end, endState);
  } else {
    // should search left side
    return recursiveStateCalc(start, startState, center, centerState);
  }
};

let database = [];

const findNextState = (start, startState, end, endState) => {
  const result = recursiveStateCalc(start, startState, end, endState);
  database.push(result);
  if (result.state === endState) {
    return;
  }
  findNextState(result.position, result.state, end, endState);
};

const findAllStates = () => {
  const start = start_point;
  const end = end_point;
  const startState = getStateByPosition(start);
  const endState = getStateByPosition(end);
  findNextState(start, startState, end, endState);
};

//Calculate all state positions
findAllStates();

console.log("database: ", database);
console.log("total count: ", call_count);
