/**
 * A class that allows you to reuse routes
 *
 * @requires RouteReuseStrategy
 * @requires ActivatedRouteSnapshot
 * @requires DetachedRouteHandle
 */

// Npm modules
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return !!route.data && !!(route.data as any).shouldDetach;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (route && route.routeConfig && route.routeConfig.path) {
            this.handlers[route.routeConfig.path] = handle;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (route && route.routeConfig && route.routeConfig.path) {
            return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
        }
        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!route.routeConfig) {
            return null;
        }
        if (route && route.routeConfig && route.routeConfig.path) {
            return this.handlers[route.routeConfig.path];
        }
        return null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

}