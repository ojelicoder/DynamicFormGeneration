import axios from 'axios';
/** incorrect api **/
// const apiURL = 'https://5a14df40-bcce-4447-b432-11214b9d4876.mock.pstmn.io/InterviewDynamicForm';
const apiURL = 'https://a328e9cb-3a60-44bc-8243-8b4f5321c3ba.mock.pstmn.io/interview';

export const GET_FORMDATA = () => axios.get(apiURL);