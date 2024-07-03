import axios, { AxiosResponse } from "axios";
import { IMapElements } from "../components/map-view/MapView";

interface IRequestCallback {
  responseCallback: (response: AxiosResponse<any, any>) => void;
  errorCallback?: (error: any) => void;
}

export async function startExecution(params: IMapElements & IRequestCallback) {
  await axios.post('server/', {
      trucks: params.trucks,
      peoples: params.peoples,
      warehouses: params.warehouses
  })
  .then((response) => {
    params.responseCallback(response);
  })
  .catch((error) => {
    params.errorCallback ? params.errorCallback(error) : console.log(error);
  });
}

export async function stopExecution(params: IRequestCallback) {
  await axios.post('server/', "stop-request")
  .then((response) => {
    params.responseCallback(response);
  })
  .catch((error) => {
    params.errorCallback ? params.errorCallback(error) : console.log(error);
  });
}

export async function cancelExecution(params: IRequestCallback) {
  await axios.post('server/', "cancel-request")
  .then((response) => {
    params.responseCallback(response);
  })
  .catch((error) => {
    params.errorCallback ? params.errorCallback(error) : console.log(error);
  });
}