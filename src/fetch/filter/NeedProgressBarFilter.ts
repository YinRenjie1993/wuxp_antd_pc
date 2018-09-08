import {FetchOption} from "typescript_api_sdk/src/api/option/FetchOption";
import {ApiResp} from "typescript_api_sdk/src/api/model/ApiResp";
import ApiAbstractFilter from "typescript_api_sdk/src/api/filter/ApiAbstractFilter";
import message from "antd/lib/message";
import Loading from "../../components/loading/Loading";
import {MaskLayerHelper} from "../../components/mask/MaskLayerHelper";


/**
 * 进度条计数器，用于在同时发起多个请求时，统一控制加载进度条
 * @type {number}
 */
let PROGRESSBAR_COUNT: number = 0;

/**
 * 需要使用请求进度条
 */
export class NeedProgressBarFilter extends ApiAbstractFilter<FetchOption, ApiResp<any>> {

    //加载文字提示
    public static LOADING_TEXT: string = "";

    protected layerHelper: MaskLayerHelper = null;

    preHandle(options: FetchOption): boolean | Promise<boolean> {
        if (options.useProgressBar) {
            if (PROGRESSBAR_COUNT === 0) {
                if (this.layerHelper != null) {
                    //防止重复出现
                    this.layerHelper.destroy();
                }
                this.layerHelper = Loading.show();
            }
            //计数器加一
            PROGRESSBAR_COUNT++;
        }
        return true
    }


    postHandle(data: ApiResp<any>, options: FetchOption): boolean {
        if (options.useProgressBar) {
            //计数器减一
            PROGRESSBAR_COUNT--;
            if (PROGRESSBAR_COUNT === 0) {
                //隐藏加载进度条
                this.layerHelper.destroy();
            }
        }
        return true
    }
}
