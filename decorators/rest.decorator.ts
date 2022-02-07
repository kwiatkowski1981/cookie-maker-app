import {RestDecoratorInfo} from "../types/rest-decorator";
import {HttpMethod} from "../types/http-method";
import {MyRouter} from "../types/my-router";

export function rest(
    httpMethod: HttpMethod,
    path: string,
) {
    return (target: MyRouter, propertyName: string): any => {
        const ar: RestDecoratorInfo[] = Reflect.get(target, '_restApiCall') ?? [];
        ar.push({
            httpMethod,
            path,
            propertyName,
        })
        // console.log('czy to działa?');
        Reflect.set(target, '_restApiCall', ar);
    }
}

export function get(path: string) {
    return rest('get', path);
}

export function post(path: string) {
    return rest('post', path);
}

export function put(path: string) {
    return rest('put', path);
}

export function patch(path: string) {
    return rest('patch', path);
}

export function deleteMethod(path: string) {
    return rest('delete', path);
}