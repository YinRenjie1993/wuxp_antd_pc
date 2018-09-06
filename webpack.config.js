const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const baseConfig = require("wuxp_antd_pc/webpack/webpack.config.template");
// const jspArtTemplate = require("./webpack-config/jspArtTemplate");

const config = {
    ...baseConfig,
};

global["__RESOURCES_BASE_NAME__"] = "";
let basePath = "";
let rootDomain = "";
let nodeDev = "dev";

const htmlPluginOptions = {
    chunks: ['app']
};

const title = "";


if (process.env.RELEASE === "1") {
    global["__RESOURCES_BASE_NAME__"] = "/web/views/";
    config.output.publicPath = `${global["__RESOURCES_BASE_NAME__"]}`;
    basePath = "/web";
    htmlPluginOptions.template = "./src/index.html";
    htmlPluginOptions.template = "./src/index.art";
    htmlPluginOptions.filename = "../jsp/index.jsp";
    // htmlPluginOptions.jspArtTemplate = jspArtTemplate;
    htmlPluginOptions.baseBath = "";
    htmlPluginOptions.inject = false;
    rootDomain = "kt.oaknt.com";
    nodeDev = "test";
} else {
    rootDomain = "kt.oaknt.com";
    htmlPluginOptions.template = "./src/index.html";
    htmlPluginOptions.filename = "index.html";
    htmlPluginOptions.title = title;
    htmlPluginOptions.baseBath = "";
    // htmlPluginOptions.favicon="./favicon.ico";
    htmlPluginOptions.inject = true;
}

const htmlWebPackPlugin = new HtmlWebPackPlugin(htmlPluginOptions);


config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            W_NODE_ENV: JSON.stringify(nodeDev),
            ROOT_DOMAIN: JSON.stringify(rootDomain),
            BASE_NAME: JSON.stringify(basePath),
            WEB_TITLE: JSON.stringify(title)
        }
    }),
    htmlWebPackPlugin
);

module.exports = config;
