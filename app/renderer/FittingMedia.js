/**
 * Created by bioz on 1/13/2017.
 */
'use strict';

const Config = require('../config/Global');

const sHTMLHeader = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "<meta charset=\"UTF-8\">" +
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
    "<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">" +
    "<style>\n" +

    "div.gallery .ref { font-weight: bold; position: absolute;  width: 100%; top: 0px; left: 0%; border: none; padding: 6px 8px; border-radius: 6px; text-align: center; text-decoration: none; border: 0px solid #e7e7e7; text-align: center; cursor: pointer; }" +
    "div.gallery .ref:link, .ref:visited { background-color: #c8334980; color: white; }" +
    "div.gallery .ref:hover, .ref:active { background-color: #c8c3cc90;}" +

    "div.gallery {\n" +
    "    position: relative;" +
    "}\n" +
    "\n" +
    "div.gallery img {\n" +
    "    width: 100%;\n" +
    "    height: auto;\n" +
    "    border: 1px solid #ccc;\n" +
    "    border-radius: 6px;\n" +
    "    box-shadow: 1px 1px;\n" +
    "}\n" +
    "\n" +
    "div.gallery video {\n" +
    "    width: 100%;\n" +
    "    height: auto;\n" +
    "    border: 1px solid #ccc;\n" +
    "    border-radius: 6px;\n" +
    "    box-shadow: 1px 1px;\n" +
    "}\n" +
    "\n" +
    "* {\n" +
    "    box-sizing: border-box;\n" +
    "}\n" +
    "\n" +
    ".responsive {\n" +
    "    padding: 0 2px;\n" +
    "    float: left;\n" +
    "    width: 24.99999%;\n" +
    "}\n" +
    "\n" +
    "@media only screen and (max-width: 600px) {\n" +
    "    .responsive {\n" +
    "        width: 49.99999%;\n" +
    "        margin: 3px 0;\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "@media only screen and (max-width: 300px) {\n" +
    "    .responsive {\n" +
    "        width: 100%;\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    ".clearfix:after {\n" +
    "    content: \"\";\n" +
    "    display: table;\n" +
    "    clear: both;\n" +
    "}\n" +
    "</style>\n" +
    "</head>";

const sHTMLBodyStart = "<body>\n" +
    "\n" +
    "<h3>BABA Fashion</h3>\n" +
    "<div style=\"margin-bottom: 10px\"><i>공유하신 사진 및 영상은 개인 정보 보호를 위해 3시간 동안 사용이 가능하며 이후에 삭제 됩니다.</i></div>";

const sHTMLBodyEnd = "<div class=\"clearfix\"></div>\n" +
    "</body>\n" +
    "</html>";

const sHTMLImgItem = "<div class=\"responsive\">\n" +
    "  <div class=\"gallery\">\n" +
    "      <img src=SRC_CONTENT alt=\"NONE\" width=\"600\" height=\"400\">\n" +
    "      <a class=\"ref\" target=\"_blank\" href=HREF_CONTENT>다운로드</a>\n" +
    "  </div>\n" +
    "</div>";

const sHTMLVideoItem = "<div class=\"responsive\">\n" +
    "  <div class=\"gallery\">\n" +
    "      <video width=\"600\" height=\"400\" controls>\n" +
    "  \t\t<source src=SRC_CONTENT type=\"video/mp4\">\n" +
    "NONE" +
    "      </video>\n" +
    "      <a class=\"ref\" target=\"_blank\" href=HREF_CONTENT>다운로드</a>\n" +
    "  </div>\n" +
    "</div>";

const renderHTML = function ( code, data )
{
    try {
        let sResult = sHTMLHeader + sHTMLBodyStart;

        for (let i = 0; i < data.length; i++) {
            let sSrc =  Config.url + "v1/fitting_medias/get_data?" + "code=" + code + "&no=" + i;
            if (data[i].type !== '.mp4') {
                let sTmp = sHTMLImgItem.replace('HREF_CONTENT', sSrc);
                sTmp = sTmp.replace('SRC_CONTENT', sSrc);
                sResult += sTmp;
            } else {
                let sTmp = sHTMLVideoItem.replace('HREF_CONTENT', sSrc);
                sTmp = sTmp.replace('SRC_CONTENT', sSrc);
                sResult += sTmp;
            }
        }

        sResult += sHTMLBodyEnd;
        return sResult;
    }catch(error){
        throw error
    }
};

module.exports = {
    renderHTML: renderHTML
};
