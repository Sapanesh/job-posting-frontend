import axios from "axios";


interface PropData {
    action: string;
    body?: any;
    isFormData?: boolean;
    isShowError?: boolean;
    id?: string;
    type?: string;
}

const WebService = {
    postAPI: function (props: PropData) {
        // this.addLoader(props.id);
        let url = this.getBaseUrl(props.type)
        return new Promise((resolve, reject) => {
            var bodyFormData = new URLSearchParams();
            for (let key in props.body) {
                bodyFormData.append(key, props.body[key]);
            }
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            };
            axios
                .post(
                    `${url}${props.action}`,
                    props.isFormData ? bodyFormData : props.body,
                    {
                        headers: headers,
                    }
                )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    if (error && error.response && error.response.status == 401) {
                        localStorage.clear();
                        window.location.href = "/login";
                    }
                    props.isShowError ? reject(this.errorHandler(error)) : reject(error);
                });
        });
    },
    putAPI: function (props: PropData) {
        // eslint-disable-line
        let url = this.getBaseUrl(props.type)
        return new Promise((resolve, reject) => {
            var bodyFormData = new URLSearchParams();
            for (let key in props.body) {
                bodyFormData.append(key, props.body[key]);
            }
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            };
            axios
                .put(`${url}${props.action}`, props.body, {
                    headers: headers,
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    if (error && error.response && error.response.status == 401) {
                        localStorage.clear();
                        window.location.href = "/login";
                    }
                    props.isShowError ? reject(this.errorHandler(error)) : reject(error);
                });
        });
    },
    uploadAPI: function (props: PropData) {
        // this.addLoader(props.id);
        let url = this.getBaseUrl(props.type)
        return new Promise((resolve, reject) => {
            var bodyFormData = new FormData();
            bodyFormData.append("file", props.body);
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            };
            axios
                .post(
                    `${url}${props.action}`, bodyFormData,
                    {
                        headers: headers,
                    }
                )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    if (error && error.response && error.response.status == 401) {
                        localStorage.clear();
                        window.location.href = "/login";
                    }

                    props.isShowError ? reject(this.errorHandler(error)) : reject(error);
                });
        });
    },

    getAccesstoken: function (props: PropData) {
        // eslint-disable-line
        // this.addLoader(props.id);
        let url = this.getBaseUrl(props.type)
        return new Promise((resolve, reject) => {
            var bodyFormData = new URLSearchParams();
            for (let key in props.body) {
                bodyFormData.append(key, props.body[key]);
            }
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
            axios
                .post(`${url}${props.action}`, bodyFormData, {
                    headers: headers,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.access_token);
                    resolve(response.data);
                })
                .catch((error) => {
                    props.isShowError ? reject(this.errorHandler(error)) : reject(error);
                });
        });
    },

    getAPI: function (props: PropData) {
        let url = this.getBaseUrl(props.type)
        return new Promise((resolve, reject) => {
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + localStorage.getItem("token"),
            };
            axios
                .get(`${url}${props.action}`, {
                    headers: headers,
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    if (error && error.response && error.response.status == 401) {
                        localStorage.clear();
                        window.location.href = "/login";
                    }
                    props.isShowError ? reject(this.errorHandler(error)) : reject(error);
                });
        });
    },

    deleteAPI: function (props: PropData) {
        let url = this.getBaseUrl(props.type)
        return new Promise((resolve, reject) => {
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + localStorage.getItem("token"),
            };
            axios
                .delete(`${url}${props.action}`, {
                    headers: headers,
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    if (error && error.response && error.response.status == 401) {
                        localStorage.clear();
                        window.location.href = "/login";
                    }
                    props.isShowError ? reject(this.errorHandler(error)) : reject(error);
                });
        });
    },

    errorHandler: function (error: any) {
        if (error?.response) {
            error = error.response;
        }

        var errorMessage;
        if (!error || !error.status) {
            errorMessage = "Server Not Responding";
        } else if (error.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
        } else if (error.status === 500) {
            errorMessage =
                (error &&
                    error.data &&
                    error.data.ErrorDetails &&
                    error.data.ErrorDetails.message) ||
                "An unkown exception has occur. Please Contact administrator";
        } else {
            errorMessage = error.data.message;
        }
        // toast.error(errorMessage);
        return errorMessage;
    },

    addLoader(id: any) {
        if (id) {
            var button = document.getElementById(id) as HTMLButtonElement | null;
            if (button != null) {
                button.disabled = true;
                var loader = document.createElement("i");
                loader.className = "bi bi-arrow-repeat mr-2";
                button.prepend(loader);
            }
        }
    },

    removeLoader(id: any) {
        if (id) {
            var button = document.getElementById(id) as HTMLButtonElement | null;
            if (button != null) {
                button.disabled = false;
                button.removeChild(button.childNodes[0]);
            }
        }
    },

    getBaseUrl(type?: string) {
        return 'http://127.0.0.1:5000/api/'

    }
};

export default WebService;
