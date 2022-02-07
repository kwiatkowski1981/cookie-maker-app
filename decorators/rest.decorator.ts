import {HttpMethod} from "../types/http-method";
import {MyRouter} from "../types/my-router";
import {RestDecoratorInfo} from "../types/rest-decorator";

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