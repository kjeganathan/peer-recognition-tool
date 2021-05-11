import axios from "axios";

async function getWithParameters(route, parameters, isWithCredentials) {
    var debug = "GET " + route;

    const response = await axios.get(
        route,
        { params: parameters },
        { withCredentials: isWithCredentials }
    );

    const data = response.data;
    debug += "\nResponse data: " + JSON.stringify(data, null, 4).substring(0, 256);
    console.log(debug);
    return data;
}

function fullName(employee) {
    return employee.firstName + " " + employee.lastName;
}

export default {getWithParameters, fullName};