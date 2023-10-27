switch($('#pageID').html()) {
    case 'chs':
        chsMap();
        break;
    case 'fhs':
        fhsMap();
        break;
    case 'ihs':
        idaMap();
        break;
}

//cleveland

function chsMap() {
    $('.map').html(
    '<div id="mapHolder">' +

        '<svg id="mapSvg" viewBox="-50 0 1600 4250">' +

        '<g> <!-- room highlight -->' +
            '<rect x="0" y="0" width="0" height="0" id="highlight" fill="#f68b27"></rect>' +
            '<polygon points="0,0 0,0 0,0" id="triHighlight" fill="#f68b27" />' +
        '</g>' +
        '<g> <!-- covers up highlights that stick out -->' +
            '<rect x="330" y="550" width="100" height="100" fill="#0f141a"></rect>' +
            '<rect x="320" y="915" width="100" height="100" fill="#0f141a"></rect>' +
            '<rect x="500" y="4156" width="100" height="100" fill="#0f141a"></rect>' +
            '<rect x="960" y="3250" width="100" height="100" fill="#0f141a"></rect>' +

        '</g>' +
        '<g id="svgButtons">' +
            '<a id="button1">' +
            '<title>Girls, First Floor</title>' +
            '<rect x="580" y="355" width="100" height="75" fill="#E0D009" />' +
            '<text>' +
                '<tspan x="620" y="400" fill="#000" font-family="monospace" font-size="26.667px">G</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button2">' +
            '<title>Boys, First Floor</title>' +
            '<rect x="870" y="355" width="100" height="75" fill="#2B99E0" />' +
            '<text>' +
                '<tspan x="912.73938" y="400.58212" fill="#e6e6e6" font-family="monospace" font-size="26.667px">B</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button3">' +
            '<title>Girls, Second Floor</title>' +
            '<rect x="250" y="1810" width="120" height="65" fill="#E0D009" />' +
            '<text>' +
                '<tspan x="293.28824" y="1850.2782" fill="#000" font-family="monospace" font-size="26.667px">G</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button4">' +
            '<title>All Genders Single User, Second Floor</title>' +
            '<rect x="250" y="1875" width="80" height="85" fill="#9901E0" />' +
            '<text text-anchor="middle">' +
                '<tspan x="285.49362" y="1915.0732" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">213</tspan>' +
            '</text>' +
            '<text text-anchor="middle">' +
                '<tspan x="285.49362" y="1938.0732" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">CCC</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button5">' +
            '<title>Boys, Second Floor East Wing</title>' +
            '<rect x="1040" y="2330" width="50" height="45" fill="#E0D009" />' +
            '<text>' +
                '<tspan x="1056.5276" y="2357.002" fill="#000" font-family="monospace" font-size="26.667px">G</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button6">' +
            '<title>All Genders Single User, Second Floor</title>' +
            '<rect x="95" y="2090" width="95" height="65" fill="#9901E0" />' +
            '<text>' +
                '<tspan x="117.47507" y="2133.5464" fill="#e6e6e6" font-family="monospace" font-size="26.667px">207</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button7">' +
            '<title>Girls, Second Floor East Wing</title>' +
            '<rect x="980" y="2330" width="55" height="45" fill="#2B99E0" />' +
            '<text>' +
                '<tspan x="1003.5237" y="2357.002" fill="#e6e6e6" font-family="monospace" font-size="26.667px">B</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button8">' +
            '<title>Boys, Second Floor</title>' +
            '<rect x="575" y="2550" width="80" height="70" fill="#2B99E0" />' +
            '<text text-anchor="middle">' +
                '<tspan x="615" y="2594" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">b</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button9">' +
            '<title>Boys, Second Floor</title>' +
            '<rect x="580" y="1810" width="70" height="65" fill="#2B99E0" />' +
            '<text>' +
                '<tspan x="607.17706" y="1851.7371" fill="#e6e6e6" font-family="monospace" font-size="26.667px">B</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button10">' +
            '<title>Boys, Third Floor East Wing</title>' +
            '<rect x="1020" y="3745" width="50" height="45" fill="#2B99E0" />' +
            '<text>' +
                '<tspan x="1035" y="3780" fill="#e6e6e6" font-family="monospace" font-size="26.667px">B</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button11">' +
            '<title>Girls, Third Floor East Wing</title>' +
            '<rect x="1060" y="3745" width="55" height="48" fill="#E0D009" />' +
            '<text>' +
                '<tspan x="1084" y="3776" fill="#000" font-family="monospace" font-size="26.667px">G</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button12">' +
            '<title>All Genders, Second Floor</title>' +
            '<rect x="250" y="2550" width="110" height="70" fill="#E08300" />' +
            '<text text-anchor="middle">' +
                '<tspan x="305" y="2594" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">AGR</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button13">' +
            '<title>Girls, Third Floor</title>' +
            '<rect x="265" y="3240" width="110" height="60" fill="#E0D009" />' +
            '<text>' +
                '<tspan x="310" y="3275" fill="#000" font-family="monospace" font-size="26.667px">G</tspan>' +
            '</text>' +
            '</a>' +

            '<a id="button14">' +
            '<title>Boys, Third Floor</title>' +
            '<rect x="590" y="3240" width="85" height="60" fill="#2B99E0" />' +
            '<text>' +
                '<tspan x="627" y="3277" fill="#e6e6e6" font-family="monospace" font-size="26.667px">B</tspan>' +
            '</text>' +
            '</a>' +
        '</g>' +

        '<g transform="translate(77.704 -21.066)" fill="#fff">' +
            '<path d="m411.02 1388.5h-111.48v-150.83h24.591v-290.17h-24.591v-283.62h31.148v-301.65h-24.591v-140.99h104.92v-22.952h113.12v22.952h345.91v-24.591h113.12v24.591h129.51v121.32h39.346v155.75h24.591v150.83h-193.45v757.4h-113.12v-24.591h-196.73v-9.8363h-149.18v39.345h-113.12zm88.528-509.03v-507.4h106.56v27.87h180.34v-27.87h108.2v621.33h63.937v-639.37h129.51v-21.312h-129.51v-111.48h-63.937v111.48h-395.09v-109.84h-63.937v522.96h-111.48v122.96h111.48v518.05h63.937zm459.03 125.41h-445.92v249.19h293.46v-44.264h88.528v172.14h63.937zm-536.08 257.38h-98.364v101.64h98.364zm383.62 3.2789h-104.92v91.807h104.92zm77.052-44.264h-65.576v136.07h65.576zm-195.09 44.264h-175.42v81.97h175.42zm-265.58-129.51h-73.773v113.12h73.773zm0-129.51h-73.773v118.04h73.773zm0-126.24h-98.364v42.625h24.591v72.134h73.773zm152.46 78.691h-62.298v32.789h62.298zm308.21-70.494h-370.5v57.38h73.773v45.903h296.73zm0-239.36h-370.5v226.24h370.5zm-460.68-42.625h-67.216v81.97h-31.148v44.264h98.364zm172.14 0h-81.97v29.509h81.97zm191.81-193.45h-180.34v222.95h180.34zm96.725 40.985h-83.609v181.97h83.609zm268.87 131.16h-180.34v39.346h180.34zm-729.53-129.51h-67.216v139.34h67.216zm172.14-1.6394h-81.97v140.99h81.97zm557.39 68.855h-24.591v-108.2h-155.75v159.02h180.34zm-729.53-172.14h-67.216v91.807h67.216zm172.14 34.427h-81.97v57.379h81.97zm288.54 0h-83.609v57.379h83.609zm244.27-18.034h-155.75v36.066h155.75zm-704.94-121.32h-91.807v91.807h91.807zm198.36 0h-108.2v73.773h108.2zm122.96 0h-111.48v73.773h111.48zm96.725 0h-85.248v73.773h85.248zm42.625 0h-31.148v73.773h31.148zm204.93 0h-116.4v73.773h116.4z" />' +
            '<path d="m732 2800.6h-70.667v20h-101.33v-20h-358.67v18.667h-105.33v-18.667h-96v-125.33h20v-312h-20v-266.67h20v-301.33h-20v-130.67h96v-20h106.67v20h357.33v-20h101.33v20h121.33v141.33h94.667v146.67h20v124h-20v46.667h114.67v-20h440v361.33h-405.33v27.191c-128.07 1.2201-227.74 0.8093-365.33 0.8093v26.667h217.33v108h24v-46.667h366.67v346.67h-537.33zm181.33-10.667h-161.33v117.33h161.33zm93.333 0h-84v117.33h84zm41.333-189.33h-34.667v46.667h-372v-830.67h121.33v-38.667h-121.33v-113.33h-61.333v113.33h-397.33v-113.33h-66.667v514.67h-96v94.667h96v525.33h66.667v-100h10.667l79.275 81.333h214.78l82.935-85.333h9.6761v105.33h61.333v-105.33h110.67v85.333h265.33v126.67h30.667zm-852.65 46.667h-31.349v-622.67h78.667v-37.333h-78.667v-165.33h129.33v36h201.33v-36h85.333v824h-23.349l-83.968 84h-194.7c-27.545-27.556-55.09-55.111-82.634-82.667zm347.32-1.3334h-48v-24h-205.33v25.333h-81.982l73.297 73.333h189.33zm-262.67-68h-106.67v58.667h106.67zm290.67-142.67h-65.333v200h65.333zm-76-54.667h-238.67v188h33.333v42.667h205.33zm-248 54.667h-73.333v133.33h73.333zm0-54.667h-73.333v45.333h73.333zm324 0h-65.333v45.333h65.333zm0-290.67h-397.33v280h397.33zm-328-54.667h-69.333v45.333h69.333zm250.67-168h-200v36h-40v177.33h240zm77.333 168h-66.667v45.333h66.667zm0-132h-66.667v121.33h66.667zm-328 0h-69.333v74.667h69.333zm40-72h-109.33v62.667h109.33zm288 0h-66.667v62.667h66.667zm678.67 982.67h-192v93.333h192zm-85.333-97.333h-106.67v88h106.67zm85.333 0h-76v88h76zm-1144-21.333h-85.333v85.333h85.333zm154.67 85.333c-23.291-23.796-41.325-41.986-66.667-67.313v67.313zm310.67-70.667c-25.205 24.7-44.469 43.807-71.314 70.667h71.314zm172-4h-90.667v74.667h90.667zm506.67-105.33h-192v106.67h192zm-1144-54.667h-65.333v138.67h65.333zm688-6.6667h-141.33v98.667h141.33zm65.333 0h-54.667v98.667h54.667zm98.667 61.333h-34.667v37.333h34.667zm45.333 0h-34.667v37.333h34.667zm-897.33-165.33h-65.333v101.33h65.333zm629.33-33.333h-82.667v70.667h82.667zm122.67 0h-112v70.667h112zm44-60h114.67v102.67h28v-120h368v-42.667h-368v-158.67h-32v158.67h-144v190.67h33.333zm105.33 57.333h-94.667v73.333h94.667zm218.67-65.333h-170.67v110.67h170.67zm186.67 0h-176v110.67h176zm-1306.7 21.333h-65.333v70.667h65.333zm752-250.67h-122.67v-56h89.333v-89.333h9.3333v134.67h24v-36h20v-85.333h-20v-49.333h-205.33v122.67h64v56h-64v290.67h205.33zm98.667 246.67h-44v38.667h44zm50.667 0h-41.333v38.667h41.333zm-901.33-66.667h-85.333v60h85.333zm897.33-141.33h-136v129.33h136zm128-20h-76v148h76zm94.667 0h-84v148h84zm93.333 0h-82.667v148h82.667zm93.333 0h-82.667v148h82.667zm-1306.7-6.6667h-85.333v52h85.333zm0-66.667h-65.333v56h65.333zm718.67 8h-80v36h80zm-118.67-1.3333h-53.333v36h53.333zm-600-100h-65.333v84h65.333zm0-88h-65.333v78.667h65.333zm752-42.667h-205.33v88h205.33zm-752-40h-65.333v72h65.333zm0-101.33h-85.333v90.667h85.333zm202.67 0h-114.67v82.667h114.67zm128 0h-117.33v82.667h117.33zm133.33 0h-122.67v82.667h122.67zm193.33 0h-110.67v82.667h110.67zm521.33 896h148v249.33h-148zm128 136h-108v93.333h108zm0-116h-108v106.67h108z" />' +
            '<path d="m107.72 4243.5h-107.72v-129.6h25.246v-321.47h-25.246v-255.83h25.246v-302.95h-25.246v-138.01h796.09v176.72h-111.08v65.639h212.06v23.563h47.125v141.38h-28.612v186.6l129.76-11.57c2.3527-53.522 1.5105-93.201 1.5105-151.47h378.69v377.01h-358.49v25.246h-141.38v37.027h-240.68v82.469h107.72v195.24h-107.72v25.246h-114.45v-25.246h-345.02v25.246h-117.81zm92.568-95.934h11.781v70.688h371.96v-84.153h11.781v109.4h63.956v-489.77h254.14v57.224h21.879v-57.224h111.08v58.907h26.928v-58.907h326.52v-50.476c-120.29-0.2856-234.66-0.5711-354.96-0.8567l-129.76 12.516h-135.91l-119.92 0.1073v-467.89h21.879v-40.393h-21.879v-85.836h-57.223v85.836h-419.08v-85.836h-50.492v1122.6h67.322zm-16.83-69.867v-626.92h79.104v-35.344h-79.104v-164.94h117.81v40.393h208.69v-40.393h92.568v817.56l-99.092 114.86h-214.82c-35.056-35.07-70.114-70.14-105.17-105.21zm107.72 10.96h-81.602l81.168 80.787c0.66006-28.444 0.43398-50.136 0.43398-80.787zm151.47-26.928h-138.01v107.72h138.01zm148.1 0h-134.65v107.72h39.53zm-299.58-48.809h-94.251v62.273h94.251zm220.48-208.69h-238.99v196.92h31.978v47.125h207.02zm79.104 114.45h-65.639v129.6h65.639zm-331.57-63.956h-62.273v146.43h62.273zm331.57-50.492h-65.639v100.98h65.639zm-331.57 0h-62.273v38.711h62.273zm60.59-289.48h-122.86v276.02h122.86zm270.98 0h-259.19v276.02h259.19zm-328.2-50.492h-65.639v38.711h65.639zm247.41-159.89h-208.69v20.197h-26.928v178.4h235.63zm80.786 151.47h-67.322v47.125h67.322zm0-131.28h-67.322v117.81h67.322zm-328.2 0h-67.322v79.104h67.322zm26.928-60.59h-94.251v48.809h94.251zm301.27 0h-67.322v47.125h67.322zm-471.25 713.61h-69.006v161.57h-25.246v79.104h94.251zm647.97 95.934h-95.934v144.75h95.934zm-647.97-195.24h-69.006v87.518h69.006zm780.94-112.76h-119.5v154.85h-107.72v20.197h227.21zm-132.96 82.469h-94.252v58.907h94.252zm213.74-23.563h-67.322v79.104h67.322zm60.59 53.858h30.295v-53.858h-79.104v79.104h48.809zm107.72-112.76h-63.956v112.76h63.956zm84.153 0h-72.371v112.76h72.371zm87.518 0h-74.055v112.76h74.055zm79.104 0h-67.322v112.76h67.322zm-1280.8 13.465h-69.006v87.518h69.006zm647.97-13.465h-94.252v69.006h94.252zm213.74 1.683h-33.662v43.76h33.662zm53.858 0h-42.076v43.76h42.076zm-915.58-112.76h-94.251v112.76h94.251zm594.12-18.514h-40.393v67.322h40.393zm53.858 0h-40.393v67.322h40.393zm122.86-75.737h-109.4v143.06h109.4zm259.19-8.4153h-77.42v138.01h77.42zm84.153 0h-72.371v138.01h72.371zm87.518 0h-74.055v138.01h74.055zm79.104 0h-67.322v138.01h67.322zm-1280.8 10.098h-94.251v80.787h94.251zm594.12-1.683h-40.393v62.273h40.393zm53.858 0h-40.393v62.273h40.393zm-647.97-95.934h-69.006v84.153h69.006zm691.74 38.711h79.104v-25.246h28.612v-90.885h-47.125v-23.563h-94.252v151.47h-104.35v33.662h138.01zm79.104 13.465h-65.639v31.978h65.639zm-126.23-153.15h-90.885v139.7h90.885zm-644.61 18.514h-69.006v69.006h69.006zm0-84.153h-69.006v72.371h69.006zm0-75.737h-69.006v63.956h69.006zm651.34-15.148h-75.738v40.393h75.738zm-651.34-85.836h-94.251v87.518h94.251zm153.15 0h-77.42v74.055h77.42zm80.787 0h-67.322v74.055h67.322zm80.787 0h-69.006v74.055h69.006zm79.104 0h-67.322v74.055h67.322zm77.42 0h-65.639v74.055h65.639zm180.09 0h-99.301v72.371h99.301z" />' +
        '</g>' +
        '<g fill="#e6e6e6" font-family="monospace" font-size="26.667px" font-weight="bold">' +
            '<g transform="translate(77.704 -21.066)">' +
            '<g>' +
                '<text x="354.1564" y="303.63605">' +
                '<tspan x="354.1564" y="303.63605" fill="#e6e6e6" font-family="monospace" font-size="26.667px">119</tspan>' +
                '</text>' +
                '<text x="538.18689" y="293.61066">' +
                '<tspan x="538.18689" y="293.61066" fill="#e6e6e6" font-family="monospace" font-size="26.667px">125</tspan>' +
                '</text>' +
                '<text x="660.14667" y="293.77075">' +
                '<tspan x="660.14667" y="293.77075" fill="#e6e6e6" font-family="monospace" font-size="26.667px">127</tspan>' +
                '</text>' +
                '<text x="771.19543" y="293.61066">' +
                '<tspan x="771.19543" y="293.61066" fill="#e6e6e6" font-family="monospace" font-size="26.667px">129</tspan>' +
                '</text>' +
                '<text transform="rotate(-90)" x="-306" y="876.9563">' +
                '<tspan x="-306" y="876.9563" fill="#e6e6e6" font-family="monospace" font-size="26.667px">123</tspan>' +
                '</text>' +
                '<text x="1006.4286" y="297.14081">' +
                '<tspan x="1006.4286" y="297.14081" fill="#e6e6e6" font-family="monospace" font-size="26.667px">135</tspan>' +
                '</text>' +
            '</g>' +
            '<g>' +
                '<text x="46.329094" y="3177.9907">' +
                '<tspan x="48" y="3177.9907">319</tspan>' +
                '</text>' +
                '<text x="59.599663" y="3267.7256">' +
                '<tspan x="59.599663" y="3267.7256">317</tspan>' +
                '</text>' +
                '<text x="59.599663" y="3345.7678">' +
                '<tspan x="59.599663" y="3345.7678">315</tspan>' +
                '</text>' +
                '<text x="59.599663" y="3428.9912">' +
                '<tspan x="59.599663" y="3428.9912">311</tspan>' +
                '</text>' +
                '<text x="59.599663" y="3517.6189">' +
                '<tspan x="59.599663" y="3517.6189">309</tspan>' +
                '</text>' +
                '<text x="49.932304" y="3617.6646">' +
                '<tspan x="49.932304" y="3617.6646">307</tspan>' +
                '</text>' +
                '<text x="49.915825" y="3725.1372">' +
                '<tspan x="49.915825" y="3725.1372">300</tspan>' +
                '</text>' +
                '<text x="58.606682" y="3836.4622">' +
                '<tspan x="58.606682" y="3836.4622">308</tspan>' +
                '</text>' +
                '<text x="58.623528" y="3941.3022">' +
                '<tspan x="58.623528" y="3941.3022">310</tspan>' +
                '</text>' +
                '<text x="58.623528" y="4110.9917">' +
                '<tspan x="60" y="4110.9917">320</tspan>' +
                '</text>' +
            '</g>' +
            '</g>' +
            '<text x="608.06641" y="521.302">' +
            '<tspan x="608.06641" y="521.302" fill="#e6e6e6" font-family="monospace" font-size="26.667px">113</tspan>' +
            '</text>' +
            '<text x="894.36578" y="521.302">' +
            '<tspan x="894.36578" y="521.302" fill="#e6e6e6" font-family="monospace" font-size="26.667px">163</tspan>' +
            '</text>' +
            '<text x="775.95129" y="437.1817" text-anchor="middle">' +
            '<tspan x="775.95129" y="437.1817" rotate="0 0 0 0 0 0 0" text-align="center">Health</tspan>' +
            '<tspan x="775.95129" y="486.36371" rotate="0 0 0 0 0 0 0 0" text-align="center">Clinic/</tspan>' +
            '<tspan x="775.95129" y="535.54572" rotate="0 0 0 0 0 0 0" text-align="center">School</tspan>' +
            '<tspan x="775.95129" y="584.72772" rotate="0 0 0 0 0 0" text-align="center">Nurse</tspan>' +
            '</text>' +
            '<text x="795.62665" y="924.90143">' +
            '<tspan x="795.62665" y="924.90143" rotate="0 0 0 0 0 0 0 0" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">Kitchen</tspan>' +
            '</text>' +
            '<text x="806.89813" y="1109.4041">' +
            '<tspan x="806.89813" y="1109.4041" rotate="0 0 0 0 0 0 0 0 0 0" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">Cafeteria</tspan>' +
            '</text>' +
            '<g transform="translate(77.704 -21.066)">' +
            '<text x="728.18689" y="1323.5443">' +
                '<tspan x="728.18689" y="1323.5443" fill="#e6e6e6" font-family="monospace" font-size="26.667px">130</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-1317.9374" y="856.90735">' +
                '<tspan x="-1317.9374" y="856.90735" fill="#e6e6e6" font-family="monospace" font-size="26.667px">132</tspan>' +
            '</text>' +
            '<text x="349.64795" y="1326.8456">' +
                '<tspan x="349.64795" y="1326.8456" fill="#e6e6e6" font-family="monospace" font-size="26.667px">120</tspan>' +
            '</text>' +
            '</g>' +
            '<text x="590.409" y="1956.4644">' +
            '<tspan x="590.409" y="1956.4644" fill="#e6e6e6" font-family="monospace" font-size="26.667px">263</tspan>' +
            '</text>' +
            '<text x="264.45987" y="2493.0449">' +
            '<tspan x="264.45987" y="2493.0449" fill="#e6e6e6" font-family="monospace" font-size="26.667px">212</tspan>' +
            '</text>' +
            '<text x="118.15463" y="2728.374">' +
            '<tspan x="118.15463" y="2728.374" fill="#e6e6e6" font-family="monospace" font-size="26.667px">220</tspan>' +
            '</text>' +
            '<text x="128.74503" y="2602.4661">' +
            '<tspan x="128.74503" y="2602.4661" fill="#e6e6e6" font-family="monospace" font-size="26.667px">218</tspan>' +
            '</text>' +
            '<text x="128.69296" y="2447.1401">' +
            '<tspan x="128.69296" y="2447.1401" fill="#e6e6e6" font-family="monospace" font-size="26.667px">210</tspan>' +
            '</text>' +
            '<text x="128.74503" y="2378.8909">' +
            '<tspan x="128.74503" y="2378.8909" fill="#e6e6e6" font-family="monospace" font-size="26.667px">208</tspan>' +
            '</text>' +
            '<text x="117.46207" y="2304.7578">' +
            '<tspan x="117.46207" y="2304.7578" fill="#e6e6e6" font-family="monospace" font-size="26.667px">200</tspan>' +
            '</text>' +
            '<text x="593.35077" y="2492.1179">' +
            '<tspan x="593.35077" y="2492.1179" fill="#e6e6e6" font-family="monospace" font-size="26.667px">266</tspan>' +
            '</text>' +
            '<text x="558.0462" y="2641.4116" text-anchor="middle">' +
            '<tspan x="456.22214" y="2641.4116" text-align="center">' +
                '<tspan x="456.22214" y="2641.4116" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">266 Student</tspan>' +
            '</tspan>' +
            '<tspan x="456.22214" y="2674.7454" text-align="center">Services Center</tspan>' +
            '</text>' +
            '<text x="448.87839" y="2219.6667" text-anchor="middle">Auditorium</text>' +
            '<text x="128.6799" y="2501.2688">' +
            '<tspan x="128.6799" y="2501.2688" fill="#e6e6e6" font-family="monospace" font-size="26.667px">216</tspan>' +
            '</text>' +
            '<text x="750.63702" y="2732.3501">' +
            '<tspan x="750.63702" y="2732.3501" fill="#e6e6e6" font-family="monospace" font-size="26.667px">232</tspan>' +
            '</text>' +
            '<text x="1205.4852" y="2852.4946">' +
            '<tspan x="1205.4852" y="2852.4946" fill="#e6e6e6" font-family="monospace" font-size="26.667px">248</tspan>' +
            '</text>' +
            '<text x="1160.554" y="2750.9834">' +
            '<tspan x="1160.554" y="2750.9834" fill="#e6e6e6" font-family="monospace" font-size="26.667px">250</tspan>' +
            '</text>' +
            '<text x="1208.8135" y="2641.9834">' +
            '<tspan x="1208.8135" y="2641.9834" fill="#e6e6e6" font-family="monospace" font-size="26.667px">252</tspan>' +
            '</text>' +
            '<text x="1148.2745" y="2378.8911">' +
            '<tspan x="1148.2745" y="2378.8911" fill="#e6e6e6" font-family="monospace" font-size="26.667px">282</tspan>' +
            '</text>' +
            '<text x="1234.7628" y="2378.8911">' +
            '<tspan x="1234.7628" y="2378.8911" fill="#e6e6e6" font-family="monospace" font-size="26.667px">284</tspan>' +
            '</text>' +
            '<text x="936.27936" y="2824.2764" text-anchor="middle">' +
            '<tspan x="903.60968" y="2824.2764" text-align="center">' +
                '<tspan x="903.60968" y="2824.2764" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">234</tspan>' +
            '</tspan>' +
            '<tspan x="903.60968" y="2857.6101" text-align="center">Band</tspan>' +
            '</text>' +
            '<text x="1075.8127" y="2824.2764" text-anchor="middle">' +
            '<tspan x="1043.1431" y="2824.2764" text-align="center">' +
                '<tspan x="1043.1431" y="2824.2764" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">236</tspan>' +
            '</tspan>' +
            '<tspan x="1043.1431" y="2857.6101" text-align="center">Choir</tspan>' +
            '</text>' +
            '<text x="886.07477" y="2577.0962">' +
            '<tspan x="886.07477" y="2577.0962" fill="#e6e6e6" font-family="monospace" font-size="26.667px">270</tspan>' +
            '</text>' +
            '<text x="775.72577" y="2577.0696">' +
            '<tspan x="775.72577" y="2577.0696" fill="#e6e6e6" font-family="monospace" font-size="26.667px">268</tspan>' +
            '</text>' +
            '<text x="745.77167" y="2424.6052">' +
            '<tspan x="745.77167" y="2424.6052" fill="#e6e6e6" font-family="monospace" font-size="26.667px">277</tspan>' +
            '</text>' +
            '<text x="856.85175" y="2424.6853">' +
            '<tspan x="856.85175" y="2424.6853" fill="#e6e6e6" font-family="monospace" font-size="26.667px">279</tspan>' +
            '</text>' +
            '<text x="1015.1473" y="2424.6187">' +
            '<tspan x="1015.1473" y="2424.6187" fill="#e6e6e6" font-family="monospace" font-size="26.667px">280</tspan>' +
            '</text>' +
            '<text x="1378.7255" y="2378.8645">' +
            '<tspan x="1378.7255" y="2378.8645" fill="#e6e6e6" font-family="monospace" font-size="26.667px">286</tspan>' +
            '</text>' +
            '<text x="1147.0978" y="2185.9099">' +
            '<tspan x="1147.0978" y="2185.9099" fill="#e6e6e6" font-family="monospace" font-size="26.667px">281</tspan>' +
            '</text>' +
            '<text x="1235.9396" y="2185.9099">' +
            '<tspan x="1235.9396" y="2185.9099" fill="#e6e6e6" font-family="monospace" font-size="26.667px">283</tspan>' +
            '</text>' +
            '<text x="1333.0183" y="2185.9099">' +
            '<tspan x="1333.0183" y="2185.9099" fill="#e6e6e6" font-family="monospace" font-size="26.667px">285</tspan>' +
            '</text>' +
            '<text x="1427.7437" y="2185.9099">' +
            '<tspan x="1427.7437" y="2185.9099" fill="#e6e6e6" font-family="monospace" font-size="26.667px">287</tspan>' +
            '</text>' +
            '<text x="774.24023" y="2217.6802">' +
            '<tspan x="774.24023" y="2217.6802" fill="#e6e6e6" font-family="monospace" font-size="26.667px">Library</tspan>' +
            '</text>' +
            '<text x="732.01263" y="2062.1116">' +
            '<tspan x="734.01263" y="2062.1116" fill="#e6e6e6" font-family="monospace" font-size="26.667px">265</tspan>' +
            '</text>' +
            '<text x="879.49615" y="1953.1564" text-anchor="middle">' +
            '<tspan x="811.73492" y="1953.1564" text-align="center">' +
                '<tspan x="811.73492" y="1953.1564" fill="#e6e6e6" font-family="monospace" font-size="26.667px" text-align="center" text-anchor="middle">255</tspan>' +
            '</tspan>' +
            '<tspan x="811.73492" y="1986.4901" text-align="center">Bookroom</tspan>' +
            '</text>' +
            '<text x="762.40533" y="1713.1195">' +
            '<tspan x="762.40533" y="1713.1195" fill="#e6e6e6" font-family="monospace" font-size="26.667px">235</tspan>' +
            '</text>' +
            '<g transform="translate(77.704 -21.066)">' +
            '<text transform="rotate(-90)" x="-1220.3527" y="393.67932">' +
                '<tspan x="-1220.3527" y="393.67932" fill="#e6e6e6" font-family="monospace" font-size="26.667px">116</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-1091.8353" y="393.73694">' +
                '<tspan x="-1091.8353" y="393.73694" fill="#e6e6e6" font-family="monospace" font-size="26.667px">110</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-961.30859" y="393.73694">' +
                '<tspan x="-961.30859" y="393.73694" fill="#e6e6e6" font-family="monospace" font-size="26.667px">106</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-699.41992" y="399.62048">' +
                '<tspan x="-699.41992" y="399.62048" fill="#e6e6e6" font-family="monospace" font-size="26.667px">109</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-554.23083" y="398.34674">' +
                '<tspan x="-554.23083" y="398.34674" fill="#e6e6e6" font-family="monospace" font-size="26.667px">115</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-430.01096" y="399.59167">' +
                '<tspan x="-430.01096" y="399.59167" fill="#e6e6e6" font-family="monospace" font-size="26.667px">117</tspan>' +
            '</text>' +
            '<text x="989.56628" y="459.17194">' +
                '<tspan x="989.56628" y="459.17194">Team</tspan>' +
                '<tspan x="989.56628" y="500.15695">Locker</tspan>' +
                '<tspan x="989.56628" y="541.14197">Rooms</tspan>' +
            '</text>' +
            '</g>' +
            '<g transform="translate(77.704 -21.066)">' +
            '<text x="217.85777" y="4051.0227">' +
                '<tspan x="217.85777" y="4051.0227" fill="#e6e6e6" font-family="monospace" font-size="26.667px">314</tspan>' +
            '</text>' +
            '<text x="203.2943" y="3977.2349">' +
                '<tspan x="203.2943" y="3977.2349">312</tspan>' +
            '</text>' +
            '<text x="203.39519" y="3901.2122">' +
                '<tspan x="203.39519" y="3901.2122">306</tspan>' +
            '</text>' +
            '<text x="203.31895" y="3373.7966">' +
                '<tspan x="203.31895" y="3373.7966">313</tspan>' +
            '</text>' +
            '</g>' +
            '<text x="963.11041" y="669.35358" />' +
            '<g transform="translate(77.704 -21.066)">' +
            '<text x="533.35474" y="3860.6953">' +
                '<tspan x="533.35474" y="3860.6953" fill="#e6e6e6" font-family="monospace" font-size="26.667px">366</tspan>' +
            '</text>' +
            '<text x="532.58057" y="3993.031">' +
                '<tspan x="532.58057" y="3993.031" fill="#e6e6e6" font-family="monospace" font-size="26.667px">344</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-3718.2947" y="266.24554">' +
                '<tspan x="-3718.2947" y="266.24554">Balcony</tspan>' +
            '</text>' +
            '<text x="381.93326" y="3662.605">' +
                '<tspan x="381.93326" y="3662.605">Auditorium</tspan>' +
            '</text>' +
            '<text x="475.2467" y="4111.0083">' +
                '<tspan x="475.2467" y="4111.0083" fill="#e6e6e6" font-family="monospace" font-size="26.667px">332</tspan>' +
            '</text>' +
            '<text x="349.93707" y="4099.1191">' +
                '<tspan x="349.93707" y="4099.1191" fill="#e6e6e6" font-family="monospace" font-size="26.667px">328</tspan>' +
            '</text>' +
            '<text x="349.87128" y="4155.3223">' +
                '<tspan x="349.87128" y="4155.3223" fill="#e6e6e6" font-family="monospace" font-size="26.667px">330</tspan>' +
            '</text>' +
            '<text transform="rotate(45)" x="3071.7183" y="2736.5298">' +
                '<tspan x="3071.7183" y="2736.5298" fill="#e6e6e6" font-family="monospace" font-size="26.667px">326</tspan>' +
            '</text>' +
            '<text x="533.16748" y="3394.0496">' +
                '<tspan x="533.16748" y="3394.0496">363</tspan>' +
            '</text>' +
            '<text x="687.83716" y="3442.9622">' +
                '<tspan x="695" y="3442.9622">355</tspan>' +
            '</text>' +
            '<text x="804.76868" y="3442.9622">' +
                '<tspan x="804.76868" y="3442.9622">357</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-3617.6133" y="702.56177">' +
                '<tspan x="-3613.6133" y="702.56177">365</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-3617.0244" y="755.99182">' +
                '<tspan x="-3613.0244" y="755.99182">361</tspan>' +
            '</text>' +
            '<text transform="rotate(-90)" x="-3696.5754" y="702.56177">' +
                '<tspan x="-3692.5754" y="702.56177">367</tspan>' +
            '</text>' +
            '<text x="1087.1892" y="3629.5696">' +
                '<tspan x="1087.1892" y="3629.5696">381</tspan>' +
            '</text>' +
            '<text x="1172.0215" y="3629.5696">' +
                '<tspan x="1172.0215" y="3629.5696">383</tspan>' +
            '</text>' +
            '<text x="1259.9454" y="3629.5696">' +
                '<tspan x="1259.9454" y="3629.5696">385</tspan>' +
            '</text>' +
            '<text x="1344.1494" y="3629.5696">' +
                '<tspan x="1344.1494" y="3629.5696">387</tspan>' +
            '</text>' +
            '<text x="1092.7976" y="3831.571">' +
                '<tspan x="1092.7976" y="3831.571">382</tspan>' +
            '</text>' +
            '<text x="922.85242" y="3874.6145">' +
                '<tspan x="922.85242" y="3874.6145">378</tspan>' +
            '</text>' +
            '<text x="1005.5057" y="3869.8303">' +
                '<tspan x="1005.5057" y="3869.8303">380</tspan>' +
            '</text>' +
            '<text x="814.51355" y="3864.5803">' +
                '<tspan x="814.51355" y="3864.5803">372</tspan>' +
            '</text>' +
            '<text x="806.2843" y="3641.0657">' +
                '<tspan x="810.2843" y="3641.0657" fill="#e6e6e6" font-family="monospace" font-size="26.667px">356</tspan>' +
            '</text>' +
            '<text x="693.92029" y="3810.5696">' +
                '<tspan x="693.92029" y="3810.5696">370</tspan>' +
            '</text>' +
            '<text x="693.50415" y="3886.2502">' +
                '<tspan x="693.50415" y="3886.2502">368</tspan>' +
            '</text>' +
            '<text x="1172.28" y="3831.571">' +
                '<tspan x="1172.28" y="3831.571">384</tspan>' +
            '</text>' +
            '<text x="1259.788" y="3831.571">' +
                '<tspan x="1259.788" y="3831.571">386</tspan>' +
            '</text>' +
            '<text x="1343.1598" y="3831.571">' +
                '<tspan x="1343.1598" y="3831.571">388</tspan>' +
            '</text>' +
            '<text x="691.84009" y="4158.5645">' +
                '<tspan x="691.84009" y="4158.5645">336</tspan>' +
            '</text>' +
            '<text x="207.78831" y="3168.5933">' +
                '<tspan x="210" y="3168.5933">325</tspan>' +
            '</text>' +
            '<text x="296.29749" y="3168.5933">' +
                '<tspan x="296.29749" y="3168.5933">327</tspan>' +
            '</text>' +
            '<text x="375.71259" y="3168.5933">' +
                '<tspan x="375.71259" y="3168.5933">329</tspan>' +
            '</text>' +
            '<text x="454.89032" y="3168.5933">' +
                '<tspan x="454.89032" y="3168.5933">331</tspan>' +
            '</text>' +
            '<text x="532.53052" y="3168.5933">' +
                '<tspan x="532.53052" y="3168.5933">333</tspan>' +
            '</text>' +
            '<text x="696.01562" y="3168.6099">' +
                '<tspan x="696.01562" y="3168.6099">335</tspan>' +
            '</text>' +
            '<text x="709.18982" y="3237.45">' +
                '<tspan x="709.18982" y="3237.45">337</tspan>' +
            '</text>' +
            '</g>' +
            '<text x="118.57761" y="1713.1996">' +
            '<tspan x="118.57761" y="1713.1996" fill="#e6e6e6" font-family="monospace" font-size="26.667px">219</tspan>' +
            '</text>' +
            '<text x="299.91098" y="1713.1062">' +
            '<tspan x="299.91098" y="1713.1062">225</tspan>' +
            '</text>' +
            '<text x="432.50528" y="1713.1195">' +
            '<tspan x="432.50528" y="1713.1195">227</tspan>' +
            '</text>' +
            '<text x="566.91583" y="1713.1328">' +
            '<tspan x="566.91583" y="1713.1328">233</tspan>' +
            '</text>' +
            '<text x="128.60178" y="1812.8926">' +
            '<tspan x="128.60178" y="1812.8926" fill="#e6e6e6" font-family="monospace" font-size="26.667px">217</tspan>' +
            '</text>' +
            '<text x="128.73849" y="1897.0273">' +
            '<tspan x="128.73849" y="1897.0273" fill="#e6e6e6" font-family="monospace" font-size="26.667px">215</tspan>' +
            '</text>' +
            '<text x="130.20334" y="1988.2225">' +
            '<tspan x="130.20334" y="1988.2225" fill="#e6e6e6" font-family="monospace" font-size="26.667px">211</tspan>' +
            '</text>' +
            '<text x="128.65384" y="2066.4739">' +
            '<tspan x="128.65384" y="2066.4739" fill="#e6e6e6" font-family="monospace" font-size="26.667px">209</tspan>' +
            '</text>' +
        '</g>' +
        '<g fill="#fff">' +
            '<rect x="113.32" y="2460.9" width="73.268" height="9.325" />' +
            '<rect x="579.31" y="2547.5" width="73.268" height="9.325" />' +
            '<rect x="269.52" y="3900.5" width="76.206" height="11.771" />' +
            '<rect transform="rotate(90)" x="2312" y="-1218.9" width="118.62" height="9.325" />' +
        '</g>' +
        '<g transform="translate(77.704 -21.066)" fill="#e6e6e6" font-family="sans-serif" font-size="66.667px">' +
            '<text x="38.800018" y="113.2">' +
            '<tspan x="38.800018" y="113.2" fill="#ffffff" font-family="monospace" font-size="66.667px">floor 1</tspan>' +
            '</text>' +
            '<text x="38.799999" y="1569.5037">' +
            '<tspan x="38.799999" y="1569.5037" fill="#ffffff" font-family="monospace" font-size="66.667px">main floor</tspan>' +
            '</text>' +
            '<text x="38.799999" y="3020.6177">' +
            '<tspan x="38.799999" y="3020.6177" fill="#ffffff" font-family="monospace" font-size="66.667px">floor3</tspan>' +
            '</text>' +
        '</g>' +
        '<g id="svgBathrooms" fill="rgb(255,255,255,0)">' +
            '<a id="square1">' +
            '<rect rx="20" x="294.84" y="358.85" width="75" height="75" id="br0" />' +
            '</a>' +
            '<a id="square2">' +
            '<rect rx="20" x="1271.3" y="358.85" width="75" height="75" id="br1" />' +
            '</a>' +
            '<a id="square3">' +
            '<rect rx="20" x="-20" y="1812.7" width="75" height="75" id="br2" />' +
            '</a>' +
            '<a id="square4">' +
            '<rect rx="20" x="-20" y="1945.2" width="75" height="75" id="br3" />' +
            '</a>' +
            '<a id="square5">' +
            '<rect rx="20" x="1247.7" y="2463.2" width="75" height="75" id="br4" />' +
            '</a>' +
            '<a id="square6">' +
            '<rect rx="20" x="-20" y="2090" width="75" height="75" id="br5" />' +
            '</a>' +
            '<a id="square7">' +
            '<rect rx="20" x="1147.7" y="2463.2" width="75" height="75" id="br6" />' +
            '</a>' +
            '<a id="square8">' +
            '<rect rx="20" x="577.58" y="2854.3" width="75" height="75" id="br7" />' +
            '</a>' +
            '<a id="square9">' +
            '<rect rx="20" x="992.48" y="1812.7" width="75" height="75" id="br8" />' +
            '</a>' +
            '<a id="square10">' +
            '<rect rx="20" x="979.41" y="3971.7" width="75" height="75" id="br9" />' +
            '</a>' +
            '<a id="square11">' +
            '<rect rx="20" x="1079.4" y="3971.7" width="75" height="75" id="br10" />' +
            '</a>' +
            '<a id="square12">' +
            '<rect rx="20" x="-20" y="2561.6" width="75" height="75" id="br11" />' +
            '</a>' +
            '<a id="square13">' +
            '<rect rx="20" x="-20" y="3228" width="75" height="75" id="br12" />' +
            '</a>' +
            '<a id="square14">' +
            '<rect rx="20" x="912.77" y="3228" width="75" height="75" id="br13" />' +
            '</a>' +
        '</g>' +

        '</svg>' +

    '</div>'
    );
}

//franklin

function fhsMap() {
    $('.map').html(
    '<div id="mapHolder">' +
        '<svg id="mapSvg" viewBox="0 0 520 1415">' +
        '<g transform="translate(237.33 691.32)">' +
            '<a id="button24">' +
            '<rect x="34.405" y="152.05" width="9.2652" height="15.637" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button23">' +
            '<rect x="25.796" y="152.05" width="8.5832" height="15.637" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button25">' +
            '<rect x="173.06" y="150.52" width="9.2652" height="16.915" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button26">' +
            '<rect x="182.1" y="150.78" width="9.1799" height="16.489" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button12">' +
            '<rect x="-43.054" y="307.49" width="6.4393" height="5.7176" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button11">' +
            '<rect x="-39.028" y="63.925" width="7.718" height="5.8028" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button27">' +
            '<rect x="-48.48" y="-109.46" width="6.3966" height="5.8028" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button28">' +
            '<rect x="-74.768" y="-97.789" width="8.2721" height="8.7438" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button8">' +
            '<rect x="-44.378" y="-158.38" width="6.1409" height="6.6979" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button1">' +
            '<rect x="-38.282" y="-317.79" width="6.9081" height="5.4192" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button2">' +
            '<rect x="-134.04" y="-629.49" width="12.769" height="5.4192" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button6">' +
            '<rect x="142.45" y="-531.72" width="6.077" height="5.3766" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button5">' +
            '<rect x="132.57" y="-519.74" width="9.5731" height="13.936" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button4">' +
            '<rect x="122.08" y="-519.74" width="10.417" height="13.936" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button3">' +
            '<rect x="-101.88" y="-569.67" width="9.0909" height="9.4755" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button7">' +
            '<rect x="-101.49" y="-560.13" width="8.5484" height="9.4755" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button31">' +
            '<rect x="184.54" y="-254.5" width="6.9081" height="5" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button32">' +
            '<rect x="184.54" y="-249" width="6.9081" height="6" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button29">' +
            '<rect x="26.308" y="-231.69" width="9.9823" height="10.905" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button30">' +
            '<rect x="36.405" y="-231.78" width="8.2945" height="10.905" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button9">' +
            '<rect x="-195.5" y="-102.92" width="13.878" height="18.875" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button10">' +
            '<rect x="-195.38" y="-83.823" width="13.75" height="16.19" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button33">' +
            '<rect x="151.63" y="-175.45" width="6.9081" height="6.9563" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button34">' +
            '<rect x="170.56" y="-151.17" width="4.5572" height="6.5343" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button22">' +
            '<rect x="-128.32" y="543.14" width="14.738" height="9.1021" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button21">' +
            '<rect x="-128.26" y="533.09" width="14.738" height="9.5843" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button13">' +
            '<rect x="-99.178" y="514.1" width="16.245" height="28.813" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button15">' +
            '<rect x="-160.21" y="593.12" width="11.152" height="23.991" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button16">' +
            '<rect x="-160.61" y="632.32" width="12.116" height="23.268" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button20">' +
            '<rect x="-139.65" y="668.83" width="11.562" height="12.058" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button20">' +
            '<rect x="31.22" y="666.6" width="9.9344" height="13.987" style="fill:#E08300;stroke-width:0" />' +
            '</a>' +
            '<a id="button18">' +
            '<rect x="13.824" y="652.71" width="27.295" height="13.685" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<a id="button17">' +
            '<rect x="13.764" y="638.7" width="27.295" height="13.685" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button14">' +
            '<rect x="-99.288" y="542.79" width="16.426" height="23.991" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +


            '<a id="button31">' +
            '<rect x="252" y="-230" width="17" height="8" style="fill:#E948F5;stroke-width:0" />' +
            '</a>' +
            '<a id="button32">' +
            '<rect x="252" y="-221" width="17" height="8" style="fill:#2B99E0;stroke-width:0" />' +
            '</a>' +
            '<g transform="matrix(.26458 0 0 .26458 -187.1 -416.07)" fill="#fff">' +
            '<path d="m-149 1421.9 7.8e-4 -5.0558 14.705-98.395v-3.6355h-42.283v-159.94h634.25v-321.72h51.475v-652.63h207.74v466.95h79.322l-0.44324-33.551-0.44342-33.551 642.22-0.9295v69.872h40.445v-34.93h42.283v-433.87h205.9v468.8h11.03v55.152h-11.03v71.304l-5.5152 2.1164v20.338h5.5152v444.93l-204.98-0.9505-0.4725-119.96-0.4732-119.96h-25.711v-123.17h25.738v-75.16l3.6766-2.2723v-25.521h-7.354v-73.534h-80.892v382.39h-204.06v-281.27h44.122v-18.384h29.414v-82.726h-36.769v68.021h-305.18v-66.183h-34.93v80.892h34.93v11.03h40.445v288.63l-193.96 0.042-13.788 2.2789v-382.87h-51.475v33.091h-27.576v40.445h-3.6768v53.314h5.5152v566.23h-130.52v29.414h-737.22zm727.07-136.04v-131.91l131.45-0.9657v-310.64h-5.5152v-71.7h3.6768v-75.313l196.71-0.98208-7.3e-4 41.364h-25.738v224.28h-73.534v34.93h86.402v5.5152h27.576v-5.5152h3.6768v-189.36h-3.6768v-110.09l2.7578-1.2845 49.637 1.9866 1.0042 65.263h286.71v-68.119l54.233 1.0176-0.02 119.5-1.6654 91.461-1.6655 91.461h116.41v-36.705l-92.836-0.98226-0.4719-130.42-0.4719-130.42 2.7826-2.6238 188.37-2.66 1.1501 2.9972 1.15 2.9972h63.951v68.021h64.344v-132.37h-60.492l-1.095 22.98-440.3 1.317v-70.254h-66.182v69.858h-172.81v-9.1918h-9.2623l2.3072 9.1918h-65.98l-132.96-2.4346v-50.879h-40.445v-340.11h-64.344v42.283h34.536l1.1076-2.8867 1.1078-2.8865 4.1447 0.58847 4.1447 0.58866v356.65l-45.041 1.0324v34.745l79.968 0.99108 0.46695 219.23 0.46696 219.23h-216.95v20.222h25.738v27.576h-90.085v9.192h-69.858v-27.576h-23.899v227.96h-270.25v-27.576h-73.534v-183.84h77.21v-16.606l-98.353 0.9796-1.1312 15.627h13.08v88.244h-12.869v42.283h-64.274l-0.95357 4.1364-0.9534 4.1365-14.709 95.921v2.43h716.09zm-247.26 9.6512v-96.519h189.36v-44.122h31.253v12.624l10.111 1.1633 1.1306 15.626h-3.8882v207.74h-227.96zm66.183 72.617v-18.384h-60.667v36.768h60.667zm156.27-36.768v-55.152h-150.75v110.3h150.75zm-156.27-5.5152v-18.384h-60.667v36.768h60.667zm0-36.768v-12.869h-60.667v25.738h60.667zm-12.869-34.011v-15.627h-47.799v31.253h47.799zm51.475 0v-15.627h-45.96v31.253h45.96zm29.414 1.1335v-14.493l-8.2726-2.2169-15.627-0.056v31.253h23.899zm27.576-0.2145v-14.708h-22.061v29.414h22.061zm27.576 0v-14.708h-22.061v29.414h22.061zm33.091-5.5152v-20.222h-27.576v40.445h27.576zm-33.091-30.333v-15.627h-60.667v31.253h60.667zm-167.29-0.9193v-14.708h-16.545v29.414h16.545zm68.021 0v-14.708h-62.505v29.414h62.505zm33.091 0v-14.708h-27.576v29.414h27.576zm99.277-4.596v-10.111h-27.576v20.222h27.576zm0-22.98v-7.3534h-27.576v14.708h27.576zm-7.3533-22.061v-9.1919h-20.222v18.384h20.222zm11.03 6.4343v-2.7575h-5.5152v5.5151h5.5152zm454.47-463.74 0.5372-14.248h90.085l0.537 14.248 0.537 14.247h-92.232zm86.02-0.4596v-9.192h-80.892v18.384h80.892zm38.606-0.0313v-14.739l91.002 0.98337 0.5369 14.247 0.5373 14.247h-92.072zm86.402 0.0313v-9.192h-80.892v18.384h80.892zm-512.92 615.86v-60.667h-126.85v121.33h126.85zm-580.92 51.016 0.0184-7.8135 74.423-25.832 0.9192-8.7307 0.91921-8.7305 1.8384-0.4148 1.8384-0.4142 1.0102 59.748h93.67v-222.45h-93.761v55.152h-5.3316l-1.1029-21.076-74.451-23.965-2e-3 -5.0556v-5.0556h-80.892v49.637h-23.899v102.95h25.738v47.799h-5.5152v22.061h84.568l0.0183-7.8133zm56.974 2.298v-5.5152h-51.475v11.03h51.475zm18.384-12.728v-18.243l-54.838 19.021 41.97 1.0353v16.429h12.869zm-211.42-28.636v-19.303h-22.061v38.606h22.061zm25.738 0v-19.303h-20.222v38.606h20.222zm25.738 0.9192v-18.384h-20.222v36.768h20.222zm-25.738-54.233v-28.495h-47.799v56.991h47.799zm-110.3 4.596v-14.708h29.414v-5.5152h-29.414v-97.436h29.414v-9.1921h-104.79v141.56h75.375zm29.414 2.7575v-11.95h-23.899v23.899h23.899zm0-48.718v-20.223h-23.899v40.445h23.899zm12.869-20.223v-38.606h-7.3533v77.21h7.3533zm698.58-14.707v-51.475h-66.183v102.95h66.183zm60.667 41.364v-10.111h-55.152v20.222h55.152zm-691.24-32.172v-33.091h-47.799v66.183h47.799zm691.24-22.061v-38.606h-55.152v77.21h55.152zm1007.4 8.2728v-28.495h-187.52v56.991h187.52zm-1779.6-6.4345v-20.222h-23.899v40.445h23.899zm104.79-1.8385v-11.03h-18.384v22.061h18.384zm161.78-18.384v-14.708h-12.869v11.03l-41.364 0.3614 53.314 17.662 0.9192 0.3612zm193.03-3.677v-11.03h-58.829v22.061h58.829zm20.222-4.596v-6.4344h-14.707v12.869h14.707zm69.858-1.8381v-8.2728h-20.222v3.6767h-44.122v12.869h64.344zm1229.9-56.072v-58.829h-31.253v49.637h-156.27v68.021h187.52zm-1531.4 54.233v-2.7577h-51.475v5.5152h51.475zm492.69-91.002v-53.314h-117.66v-20.222h-18.384v9.192h-44.122v25.738h-31.253v91.919h211.42zm1001.9 0v-22.061h-22.061v-49.637h-128.69v93.761h150.75zm-777.65-34.93v-34.93h-16.545v-5.5153h-80.892v75.375h97.436zm91.919-2.7579v-37.688h-69.858v5.5152h-16.545v69.858h86.402zm283.12 0.9194v-36.768h-36.768v73.534h36.768zm34.93 20.222v-16.545h-29.414v33.091h29.414zm36.768 0v-16.545h-31.253v33.091h31.253zm16.545 0v-16.545h-11.03v33.091h11.03zm36.768 0v-16.545h-31.253v33.091h31.253zm23.899 0v-16.545h-18.384v33.091h18.384zm290.47-20.222v-9.192h-31.253v-27.576h-9.1919v5.5152h-12.869v40.445h53.314zm-290.47-5.5152v-3.6768h-143.4v7.3532h143.4zm-933.92-11.95v-10.111h-25.738v20.222h25.738zm810.73-8.2727v-11.03h-20.222v22.061h20.222zm45.96 0v-11.03h-40.444v22.061h40.444zm18.384 0v-11.03h-14.708v22.061h14.708zm27.576 0v-11.03h-23.899v22.061h23.899zm31.253 0v-11.03h-25.738v22.061h25.738zm290.47 0v-11.03h-25.738v22.061h25.738zm-1123.3-24.819v-28.495h-27.576v56.991h27.576zm84.568 0v-28.495h-79.051v56.991h79.051zm-167.29-6.4344v-23.899h-44.122v47.799h44.122zm25.738 11.95v-11.95h-20.222v23.899h20.222zm1134.3 5.5152v-2.7576h45.96v-33.091h-29.414v-84.568h29.414v-69.858h-5.5153v-36.768h-178.33v38.607h-3.6767v187.51h134.21v3.6767h7.3533zm-1110.4-12.869v-10.111h-18.384v20.222h18.384zm744.58-9.1918v-19.303h-64.344v38.607h64.344zm215.09-36.768v-56.071h-20.222v112.15h20.222zm-525.79 36.768v-17.465h-66.183v34.93h66.183zm-457.76-10.111v-9.1918h-20.222v18.384h20.222zm23.899-4.596v-8.2727h117.66v-115.82h-159.94v3.6768h-5.5152v36.768h-45.96v73.534h75.375v18.384h18.384zm1156.3-41.364v-36.768h-23.899v73.534h23.899zm-843.8-73.534v-106.63h-68.021v213.26h68.021zm121.34 32.172v-74.458h-66.183v148.91h66.183zm384.23 62.506v-11.95h-40.445v23.899h40.445zm47.799-5.5152v-17.464h-42.283v34.93h42.283zm-150.75 1.8384v-13.788h-18.384v-5.5152h-16.545v33.091h34.93zm29.414 6.4344v-7.3534h-23.899v14.707h23.899zm0-22.98v-11.95h-23.899v23.899h23.899zm73.534-12.869v-15.627h-40.445v31.253h40.445zm-102.95-5.5152v-15.627h-34.93v25.738h22.061v5.5152h12.869zm150.75-5.5152v-15.627h-42.283v31.253h42.283zm-121.33-0.91921v-9.1918h-23.899v18.384h23.899zm73.909-20.682 0.5475-11.49h3.6767l0.576 5.9748 0.5763 5.975h42.05v-45.96h-88.244v56.991h40.27zm-72.068-32.632v-31.253h-66.183v62.506h66.183zm-799.68 13.788v-15.627h-40.445v31.253h40.445zm170.97-53.314v-28.495h-159.94v56.991h159.94zm700.46 5.5152v-15.627h-40.445v31.253h40.445zm47.799 0v-15.627h-42.283v31.253h42.283zm-121.33-12.869v-6.4344h-23.899v12.869h23.899zm-347.46-3.6768v-2.7578h-29.414v5.5152h29.414zm468.8-19.303v-14.708h-88.244v29.414h88.244zm-748.26-38.606v-34.93h-159.94v69.858h159.94zm906.34 0v-31.253h-58.829v62.506h58.829zm132.37 16.545v-14.708h-55.152v29.414h55.152zm-290.47-24.819v-26.657h-88.243v53.314h88.243zm-584.62-10.111v-18.384h-33.091v36.768h33.091zm31.253 0v-18.384h-25.738v36.768h25.738zm-134.21 0.9192v-13.788h-22.061v27.576h22.061zm978.04 0v-13.788h-55.152v27.576h55.152zm-818.09-3.6768v-15.627h-20.222v31.253h20.222zm818.09-17.465v-1.8384h11.03v-36.268l-17.059-2.3381h-50.962v42.283h56.991zm-1119.6-19.303v-17.464h-79.051v34.93h79.051zm45.96-68.021v-45.041h-125.01v90.085h125.01zm255.54 11.03v-32.172h-93.761v64.344h93.761zm128.69 0v-32.172h-123.17v55.152h14.707v9.1918h108.46zm53.314 11.95v-20.222h-47.799v40.445h47.799zm123.17-11.95v-32.172h-45.96v64.344h45.96zm196.71 13.788v-18.384h-191.2v36.768h191.2zm27.576 8.2726v-10.111h-22.061v20.222h22.061zm128.69-3.677v-11.95h-27.576v23.899h27.576zm31.253 2.7578v-9.192h-25.738v18.384h25.738zm128.69-36.768v-45.96h-56.991v91.919h56.991zm-196.71 29.414v-14.707h-36.768v29.414h36.768zm134.21-43.203v-37.688h62.505v-244.51h-187.52v215.09h31.253v14.564l32.172 1.0624 0.4925 44.581 0.4927 44.581h60.602zm-82.303-104.33 0.4925-44.581 24.818-1.0872v90.252h-25.803zm19.796-0.4596v-39.525h-14.707v79.051h14.707zm-163.62 134.21v-6.4344h-22.061v12.869h22.061zm159.94-34.93v-41.364h-33.091v-14.707h-25.738v91.919h33.091v5.5152h25.738zm-329.07 13.788v-11.03h-49.637v22.061h49.637zm55.152 0v-11.03h-49.637v22.061h49.637zm58.829 0v-11.03h-53.314v22.061h53.314zm55.152 0v-11.03h-49.637v22.061h49.637zm-347.46-1.8384v-9.1918h-47.799v18.384h47.799zm-373.19-20.222v-22.061h-34.93v44.122h34.93zm-115.82-33.091v-14.707h-73.534v29.414h73.534zm51.475 0v-14.707h-45.96v29.414h45.96zm64.344-22.98v-28.495h-34.93v56.991h34.93zm-64.344-40.445v-43.203h-125.01v86.402h125.01zm64.344-33.091v-39.525h-34.93v79.051h34.93zm-64.344-45.041v-29.414h-51.475v22.061h-33.091v-22.061h-40.445v58.829h125.01zm64.344-17.465v-17.464h-34.93v34.93h34.93zm-121.34-3.6768v-8.2726h-22.061v16.545h22.061zm56.991-41.364v-27.576h-125.01v55.152h125.01zm64.344-0.91921v-22.98h-34.93v45.96h34.93zm0-51.475v-22.98h-34.93v45.96h34.93zm-110.3-1.8384v-21.141h-79.051v42.283h79.051zm957.82 9.192v-8.2726h14.708v-75.375h-40.445v91.919h25.738zm130.52 2.7576v-5.5152h-12.869v-90.085h5.5151v-12.869h-108.46v14.279l6.4344 1.6794-1.0491 86.993h-14.578v11.03h125.01zm31.253-40.445v-45.96h-38.606v75.375h12.869v16.546h25.738zm-1103-33.189v-34.833h-95.595v69.928l95.595-0.26105v-34.832zm93.76 0.0971v-34.93h-88.243v69.858h88.243zm856.73-26.657v-8.2726h-34.93v16.545h34.93zm152.58 0v-8.2726h-33.091v16.545h33.091z" style="stroke-width:1.8384" />' +
            '<path d="m-169.59 2842.3v-32.214h19.987l3.7983-19.328 1.913-10.923 1.913-10.923v-1.1646h-47.861v-165.67h646.12v-322.14h51.542v-653.48h208.01v467.56h79.154v-68.11h642.44v69.95h82.836v-469.4h206.17v469.4h11.045v55.224h-11.045v73.632h-5.5224v20.249h5.5224v445.47h-206.17v-237.46h-20.249v-125.17h20.249v-79.154h3.6816v-25.771h-7.3632v-73.632h-80.995v382.89h-204.33v-281.64h73.632v-101.24h-36.816v68.11h-305.57v-66.269h-34.975v92.04h75.473v289.01h-208.01v-381.04h-49.702v33.134h-29.453v40.498h-3.6816v53.383h5.5224v596.42h-887.26zm127.01-15.647v-38.657h-29.453v-22.09h-58.434l-1.1754 7.8234-1.1755 7.8234-7.8035 37.736h-19.768v46.02h117.81zm346.07 28.532v-10.124h-285.36l-55.178-27.634v47.883h340.55zm90.199-47.861v-57.985h-84.677v115.97h84.677zm156.47 47.861v-10.124h-149.1v20.249h149.1zm79.154-34.055v-44.179h-14.726v-5.5224h-57.065v93.881h71.791zm79.154-2.7612v-46.94h-57.065v5.5224h-16.567v88.358h73.632zm-610.7 0.8397 68.586-20.33 30.421-9.1756-0.48368-64.742-0.48367-64.744-60.746-17.29-112.16-31.798-59.958 28.567v19.444h20.249v32.81l15.647 2.4076 11.965 2.0072v61.914l-21.169 2.2993-8.2836 1.7173v31.224h-18.408v17.543l56.144 28.265 10.092 0.2099 68.586-20.33zm23.487 12.436v-7.8937l74.482-24.501 1.1263-3.3791-139.12 41.179-2.7612 1.0988-2.7612 1.099 69.03 0.2908zm75.473-9.4525v-17.346l-69.03 23.023-1.1537 11.67h70.184zm106.77-96.784v-114.13h-101.24v228.26h101.24zm248.51 77.314v-36.816h14.726v-7.3631h-23.93v-25.771h23.93v-3.6817h-167.51v110.45h152.79zm-576.17-27.827v-13.101l-8.2836 2.2201-4.602 0.05v23.93h12.886zm-18.408-78.018v-85.597h-23.93v23.93h12.886v79.154h-12.886v3.6816h-14.726v9.204h14.726v55.224h23.93zm688.46 71.791v-2.7612h62.587v-12.886h-93.881v-90.199h60.746v-42.338h-84.677v-68.11h9.204v-12.886h-9.204v-75.473h9.204v-20.249h108.61v-154.63h-5.5224v-71.791h3.6816v-75.473h189.6v305.57h7.3632v3.6816h25.771v-3.6816h22.09v-36.816h-33.134v-268.76h161.99v33.134h-95.721v33.134h261.39v-34.975h-93.881v-33.134h161.99v119.65h-5.5224v152.79h-29.453v36.816h53.383v-104.93h5.5224v-11.045h-5.5224v-42.338h5.5224v-11.045h-5.5224v-140.46l335.03 2.6815v-37.096h-16.567v12.886h-58.906v-12.281l-245.75-2.4423h-639.68v-58.906h-38.657v-338.71h-66.269v42.338h44.179v132.54h-11.045v88.358h5.5224v40.498h-3.6816v95.721h-31.294v46.02h29.453v9.2039h7.3632v-14.726h33.134v42.338h-3.6816v25.771h11.045v75.473h-11.045v34.975h11.045v92.04h-69.95v-11.045h-7.3632v11.045h-46.02v-11.045h-11.045v11.045h-82.836v22.09h106.77v327.66h47.861v5.5224h25.771zm-740-24.851v-16.567h9.204v-88.358h-9.204v-27.612h-86.517v147.16l50.622 1.1372 35.896 0.8074zm22.09 2.7612v-13.806h-16.567v27.612h16.567zm56.144 9.2445 11.045-1.1093 10.124-1.9848v-51.18l-8.2836-1.9344-34.055-4.9021v64.124l10.124-1.9039zm582.61-10.165v-9.204h-20.249v18.408h20.249zm141.74-12.886v-14.726h-60.746v-49.702h-27.612v79.154h88.358zm-314.78-55.224v-66.269h-84.677v132.54h84.677zm66.269-10.124v-56.144h-60.746v112.29h60.746zm106.77 34.975v-21.169h-101.24v42.338h101.24zm-638.76-26.692v-36.816h-7.3632v73.632h7.3632zm780.5-9.2041v-46.02h-27.612v47.861h-27.612v44.179h55.224zm-767.61 8.2837v-34.055h-7.3632v68.11h7.3632zm36.816 2.7612v-12.886h-14.726v23.623l4.602 1.857 10.124 0.2904v-12.886zm1588.6-17.488v-21.169h-36.816v42.338h36.816zm36.816 7.363v-13.806h-31.293v27.612h31.293zm38.657 0v-13.806h-33.134v27.612h33.134zm29.453 0v-13.806h-23.93v27.612h23.93zm46.02 0v-13.806h-40.498v27.612h40.498zm-1150.5-23.93v-32.214h-101.24v64.428h101.24zm-370.35 8.1793-0.64838-1.9452-74.482-24.501v-13.947l-74.552 0.2905 3.6816 1.5369 141.74 40.249 4.9088 0.2624-0.6484-1.9451zm1489.6-76.288v-72.712h-27.612v-51.542h27.612v-3.6817h31.294v-33.134h-187.76v33.134h33.134v51.542h44.179v112.29h-34.975v36.816h114.13zm-68.109 13.806v-47.861h58.905v95.721h-58.905zm25.771 34.055v-8.2836h-20.249v16.567h20.249zm27.612-11.045v-19.328h-22.09v38.657h22.09zm-27.612-11.045v-8.2836h-20.249v16.567h20.249zm27.612-34.055v-20.249h-47.861v40.498h47.861zm46.02 65.348v-15.647h-25.771v31.294h25.771zm-1520.5-4.6019v-16.567h-70.195l1.1649 9.8395 68.109 23.004 0.9204 0.2901v-16.567zm-268.76-5.5224v-11.045h-16.567v22.09h16.567zm79.001-10.31 0.76699-0.7346h-44.792v21.834l43.259-20.365zm1559.3 2.947v-18.408h-36.816v36.816h36.816zm-857.81-28.532v-28.532h-112.29v57.065h112.29zm1008.8 9.204v-15.647h-25.771v31.294h25.771zm-1150.5-24.851v-34.975h-101.24v69.95h101.24zm1034.5 15.647v-19.328h-29.453v38.657h29.453zm-34.975-4.602v-9.2039h-36.816v18.408h36.816zm150.95-22.09v-14.726h-25.771v29.453h25.771zm-150.95 5.5225v-1.8409h34.975v-58.906h-71.791v62.587h36.816zm-857.81-64.428v-51.542h-103.08v20.249h-9.204v64.428h9.204v18.408h103.08zm1008.8 20.249v-18.408h-25.771v36.816h25.771zm-1150.5-34.055v-43.259h-101.24v86.517h101.24zm346.07 2.7613v-33.134h-14.726v-3.6814h-93.881v69.95h108.61zm80.995-1.8409v-34.975h-58.905v3.6814h-16.567v66.269h75.473zm316.62 0.9205v-34.055h-69.95v68.11h69.95zm115.97 0v-34.055h-110.45v68.11h110.45zm130.7-12.886v-23.01h-27.612v46.02h27.612zm160.15 11.045v-10.124h-31.293v-20.249h-22.09v40.498h53.383zm0-24.851v-9.2038h-25.771v18.408h25.771zm-443.63-31.294v-18.408h-33.134v36.816h33.134zm152.79-0.9203v-19.328h-88.358v38.657h88.358zm-535.67-0.9204v-18.408h-86.517v36.816h86.517zm103.08 0v-18.408h-36.816v36.816h36.816zm526.47-39.577v-57.985h-14.726v115.97h14.726zm-977.46 15.647v-5.5224h16.567v-110.45h-93.881v121.49h77.313zm57.065-55.224v-60.746h-34.975v121.49h34.975zm77.313 20.249v-40.498h-11.045v-40.498h-60.746v110.45h12.886v11.045h58.905zm1008.8-1.8408v-40.498h31.293v-71.791h-5.5224v-36.816h-178.56v38.657h-3.6816v150.95h156.47zm31.293 2.7612v-37.736h-25.771v75.473h25.771zm-414.18 1.8408v-34.055h-36.816v-5.5225h-25.771v73.632h62.587zm-412.34-3.6816v-35.896h-86.517v71.791h86.517zm103.08 0v-35.896h-25.771v7.3633h-44.179v64.428h69.95zm432.59 0v-35.896h-82.836v16.567h-5.5223v55.224h88.358zm-463.88-37.736v-3.6815h31.294v-75.473h-69.95v82.836h38.657zm340.55-34.975v-36.816h-62.587v68.11h31.294v5.5223h31.294zm-412.34 16.567v-14.726h-86.517v29.453h86.517zm535.67-0.9204v-15.647h-88.358v31.294h88.358zm-535.67-92.04v-72.712h-16.567v60.746h-69.95v84.677h86.517zm535.67 29.453v-41.418h-88.358v66.269h5.5223v16.567h82.836zm-749.2 1.8408v-32.214h-160.15v64.428h160.15zm-11.045-53.383v-15.647h3.6816v-29.453h-22.09v12.886h-18.408v-9.204h-112.29v57.065h149.1zm953.53-17.488v-33.134h-93.881v66.269h93.881zm97.562 0v-33.134h-92.04v66.269h92.04zm-738.16-1.8408v-29.453h-7.3632v58.906h7.3632zm279.8-1.8408v-31.294h-7.3632v62.587h7.3632zm-425.22 0v-27.612h-27.612v55.224h27.612zm34.975 0v-27.612h-29.453v55.224h29.453zm487.81 13.806v-11.965h-18.408v23.93h18.408zm36.816-17.488v-29.453h-29.453v58.906h29.453zm33.134 0v-29.453h-27.612v58.906h27.612zm-686.62-8.2836v-13.806h-23.93v27.612h23.93zm616.67-4.6021v-14.726h-18.408v29.453h18.408zm-281.64-1.8408v-11.045h-84.677v22.09h84.677zm165.67-1.8407v-11.045h-82.836v22.09h82.836zm-640.6-28.532v-23.01h-82.836v46.02h82.836zm1128.4-4.602v-18.408h-55.224v36.816h55.224zm-121.49-14.726v-3.6815h-9.2041v7.3631h9.2041zm23.93-11.045v-14.726h-20.249l0.037 10.124 2.3215 19.328h17.895v-14.726zm14.726 11.045v-3.6815h-9.204v7.3631h9.204zm-1014.3-54.303v-45.1h-114.13v90.199h114.13zm797.07 12.886v-32.214h-104.93v64.428h104.93zm125.17 20.249v-11.965h-23.93v23.93h23.93zm14.726-1.8408v-13.806h-9.2039v27.612h9.2039zm36.816 2.7612v-11.045h31.294v22.09h31.294v-33.134h49.702v-314.78h-187.76v318.46h25.771v-33.134h-22.09v-73.632h5.5223v68.11h22.09v34.975h12.886v33.134h31.294zm-12.886-81.078-39.577-3.2639-4.602-0.3339v-75.817l7.3633-1.9255v-16.138h-20.249v-34.975h12.886v-49.702h9.2041v-23.93h-14.726v-5.5224h18.408v34.975h-7.3633v49.702h-12.886v25.882l19.328-1.0306 1.0816 26.692h-7.5245v66.199l8.2837 1.7334 62.587 3.9428 11.965 1.924v-16.734h29.453v14.726h23.93v-71.791h-7.3632v-25.771h20.249v-25.771h-12.886v-49.702h-7.3632v-34.975h16.567v5.5224h-12.886v23.93h9.2039v49.702h12.886v36.816h-20.249v16.567h7.3632v79.154h-33.134v-12.886h-20.249v16.567l-10.124-0.5013zm-22.09-76.31v-45.1h23.93v90.199h-23.93zm18.408-0.9204v-40.498h-12.886v80.995h12.886zm128.86 155.55v-13.806h-44.179v27.612h44.179zm-808.11-19.328v-31.294h-104.93v62.587h104.93zm114.13 0v-31.294h-108.61v62.587h108.61zm101.24 0v-31.294h-95.722v62.587h95.722zm80.995 0v-31.294h-75.473v62.587h75.473zm112.29 0v-31.294h-106.77v62.587h106.77zm-611.14-44.179v-16.567h-33.134v33.134h33.134zm-71.791-33.134v-14.726h-117.81v29.453h117.81zm71.791-20.249v-31.294h-33.134v62.587h33.134zm-77.313-44.179v-44.179h-112.29v88.358h112.29zm77.313-31.294v-38.657h-33.134v77.314h33.134zm-66.269-47.861v-29.453h-49.702v22.09h-33.134v-22.09h-40.498v58.906h123.33zm66.269-14.726v-18.408h-33.134v36.816h33.134zm-119.65-5.5224v-9.204h-25.771v18.408h25.771zm53.383-43.259v-28.532h-123.33v57.065h123.33zm66.269 1.8408v-23.01h-33.134v46.02h33.134zm0-53.383v-24.851h-33.134v49.702h33.134zm-110.45-3.6817v-21.169h-79.154v42.338h79.154zm959.13 3.2214 0.064-16.107 5.2614-9.2039 0.1288-52.463h-31.294v93.881h25.771l0.064-16.107zm64.363-39.117v-55.224h-53.383v70.132l-5.0947 9.9416-2.6518 30.373h61.129zm66.269 43.185v-12.038l-7.3632-14.433v-71.938h-53.383v110.45h60.746zm31.294-33.981v-46.02h-33.134l0.081 50.622 3.6413 8.0243 3.641 8.0245v25.37h25.771v-46.02zm-1104.5-32.214v-32.214h-95.721v64.428h95.721zm93.881 0v-32.214h-88.358v64.428h88.358zm1010.6-25.771v-6.4427h-33.134v12.886h33.134zm-156.47-0.9204v-5.5223h-31.294v11.045h31.294z" style="stroke-width:1.8408" />' +
            '<path d="m441.4-177.53v-190.08h-49.587v73.463h-236.92v-596.88h207.53v466.49h78.972v-67.953h640.96v69.79h82.646v-468.32h205.7v468.32h11.019v47.751h11.02v80.809h-66.116v22.039h-113.87v-23.875h-51.424v-73.463h-80.809v382.01h-203.86v-317.73h-227.73v317.73h-207.53zm842.98-131.31v-27.549h-69.79v31.222h7.3462v23.875h62.443zm33.058 16.529v-11.019h7.3463v-33.058h-34.895v55.097h27.548zm47.751-30.303v-19.284h-34.895v38.568h34.895zm20.202-12.856v-32.14h-14.693v64.28h14.693zm-1057.9-2.7548v-33.058h-163.45v66.116h163.45zm33.058 27.548v-5.5097h-27.549v11.02h27.549zm22.039-3.673v-9.1829h-16.529v18.366h16.529zm826.46-6.428v-15.611h-38.568v31.222h38.568zm-848.49-4.5914v-3.6732h22.039v-16.529h-22.039v-51.424h33.058v20.202h9.1828v-38.568h-49.587v-56.934h-33.058v-235.08h33.058v-97.338h-67.56l-1.0571-2.7548-1.0571-2.755h-31.337v44.078h47.751v354.46h-44.078v34.895h77.136v55.097h27.549zm844.82-40.405v-23.875h-34.895v47.751h34.895zm36.731 0v-23.875h-31.222v47.751h31.222zm82.646 21.121v-2.7549h40.404v-25.712h7.3462v-40.404h-11.019v-7.3464h-29.385v-14.692h-60.607v22.039h-23.875v71.626h77.136zm-942.16-16.529v-10.101h-16.529v20.202h16.529zm-187.33-33.058v-17.447h-31.222v34.895h31.222zm55.097 0v-17.447h-49.587v34.895h49.587zm137.74 10.101v-7.3462h-22.039v14.693h22.039zm775.03-11.938v-17.447h-18.366v34.895h18.366zm78.972-37.65v-38.568h3.673v-16.529h-5.5097v-42.241h5.5097v-16.529h-3.673v-47.751h3.673v-16.529h-3.673v-55.097h77.136v-5.5096h42.241v-69.79h-9.1829v-23.875h9.1829v-44.078h-31.222v66.116h-115.7v-56.934h-40.405v33.058h25.712v31.222h156.11v56.934h-89.992v-51.424h-91.828v29.385h42.241v284.67h-45.914v22.039h71.626zm-947.67-29.385v-45.914h-130.4v91.828h130.4zm971.54 35.813v-8.2645h-18.366v16.529h18.366zm-55.097-22.039v-26.63h-36.731v53.261h36.731zm150.6-2.7548v-25.712h-110.19v11.019h-3.6731v25.712h89.992v14.693h23.875zm-1008.3-39.486v-13.774h-27.549v27.548h27.549zm857.68-18.366v-28.467h-36.731v56.934h36.731zm150.6 0v-26.63h-110.19v11.019h-5.5097v31.222h5.5097v11.019h110.19zm-1008.3-16.529v-15.611h-27.549v31.222h27.549zm-108.36-1.8366v-13.774h-80.809v27.548h80.809zm49.587 0v-13.774h-44.078v27.548h44.078zm1067-43.159v-29.385h-110.19v11.019h-3.6731v34.895h3.6731v12.856h110.19zm-150.6 14.692v-12.856h-36.731v25.712h36.731zm-916.45-34.895v-44.078h-130.4v88.155h130.4zm58.77 29.385v-14.692h-27.549v29.385h27.549zm857.68-26.63v-13.774h-36.731v27.548h36.731zm-857.68-32.14v-38.568h-27.549v77.136h27.549zm1008.3-15.611v-30.303h-34.895v5.5097h-78.972v44.078h3.6731v11.02h110.19zm-150.6 16.529v-11.938h-36.731v23.875h36.731zm0-30.304v-12.856h-36.731v25.712h36.731zm-916.45-50.506v-59.688h-130.4v119.38h130.4zm58.77 17.448v-18.366h-27.549v36.731h27.549zm857.68 0.9183v-13.774h-36.731v27.548h36.731zm139.58-25.712v-22.957h-78.972v45.914h78.972zm-156.11-41.323v-12.856h-20.202v25.712h20.202zm167.13-4.5914v-6.428h-3.6732v12.856h3.6732zm-89.992-61.525v-66.116h-97.338v20.202h51.424v60.607h-5.5097v51.424h51.424zm53.261 10.101v-56.015h5.5097v-20.202h-53.26v132.23h47.751zm-1078.1 31.222v-8.2645h-49.587v-22.039h-33.058v38.568h82.646zm0-22.039v-8.2645h-44.078v16.529h44.078zm947.67-27.548v-17.447h-20.202v34.895h20.202zm25.712-7.3462v-24.794h-45.914v9.1828h25.712v40.404h20.202zm-973.38 18.366v-2.7549h18.366v-66.116h-101.01v71.626h82.646zm106.52-33.058v-35.813h-82.646v66.116h18.366v5.5097h64.28zm1008.3 10.101v-20.202h-31.222v40.404h31.222zm0-35.813v-10.101h-25.712v20.202h25.712z" style="stroke-width:1.8366" />'  +
            '<text x="130" y="-984.13336" style="font-family:sans-serif;font-size:88.889px;line-height:1.25" xml:space="preserve">' +
                '<tspan x="130" y="-984.13336" style="font-family:monospace;font-size:88.889px;text-align:center;text-anchor:middle;">ground</tspan>' +
            '</text>' +
            '<text x="130" y="312.24463" style="font-family:sans-serif;font-size:88.889px;line-height:1.25" xml:space="preserve">' +
                '<tspan x="130" y="312.24463" style="font-family:monospace;font-size:88.889px;text-align:center;text-anchor:middle">floor 1</tspan>' +
            '</text>' +
            '<text x="130" y="1758.2466" style="font-family:sans-serif;font-size:88.889px;line-height:1.25" xml:space="preserve">' +
                '<tspan x="130" y="1758.2466" style="font-family:monospace;font-size:88.889px;text-align:center;text-anchor:middle">floor2</tspan>' +
            '</text>' +
            '<text x="130" y="3064.8308" style="font-family:sans-serif;font-size:88.889px;line-height:1.25" xml:space="preserve">' +
                '<tspan x="130" y="3064.8308" style="font-family:monospace;font-size:88.889px;text-align:center;text-anchor:middle">gym</tspan>' +
            '</text>' +
            '</g>' +
            '<g transform="translate(28.643)" fill="#fff">' +
            '<path transform="matrix(.26458 0 0 .26458 -187.1 -416.07)" d="m-162.15 4161.7v-59.974h-11.048v-939.07h350.38v7.8913h-88.383v197.28h192.55v-82.07h11.048v935.92h-454.54zm53.661 37.09v-13.415h121.53v-7.8913h69.444v-28.409h-14.204v-52.083h101.01v47.348h22.096v-69.444h-102.59v-222.54h-11.048v-121.53h4.7348v18.939h17.361v-33.144h-22.096v-184.66h94.696v89.962h48.927v-108.9h59.974v-135.73h-72.601v26.831h-4.7348v-26.831h-112.06v20.518h77.335v-6.3131h4.7348v11.048h-91.54v89.962h91.54v4.7348h-91.54v20.518h-4.7348v-119.95h9.4696v-20.298l-3.5511-0.5041-3.5511-0.5046-0.43568-24.069-0.43567-24.068h-53.579v12.626h-167.3v-14.204h-22.096v50.505h190.97v71.022h-4.7348v22.096h15.783v108.9h-15.783v77.336h17.729l-0.95165 3.5509-0.95167 3.5513-0.02147 46.164-0.02147 46.165h-14.204v25.252h14.204v126.26h-11.048v52.083h12.626v162.56h-4.7348v-23.674h-55.24v52.083h-61.553v-52.083h-72.601v113.64h45.77zm312.5-696.02v-11.837h4.7348v23.674h-4.7348zm0-55.24v-30.776h4.7348v61.553h-4.7348zm-190.97 753.63v-11.048h-116.79v22.096h116.79zm37.879-3.9456v-14.994h-33.144v29.987h33.144zm113.64-16.572v-31.566h-77.335v33.144h-31.565v29.987h108.9zm118.37 0v-31.566h-113.64v63.131h113.64zm-329.86-58.396v-23.674h-29.987v47.348h29.987zm22.096 0v-23.674h-17.361v47.348h17.361zm137.31 0.7891v-21.307h-39.457v42.613h39.457zm52.083 0v-21.307h-47.348v42.613h47.348zm118.37-13.415v-34.722h-86.805v69.444h86.805zm-413.51-37.878v-22.096h-34.722v44.192h34.722zm42.613 0v-22.096h-37.879v44.192h37.879zm88.383 14.204v-7.8915h-12.626v-28.409h-71.022v44.192h83.649zm34.722-12.626v-20.518h-42.613v20.518h12.626v20.518h29.987zm247.79-98.642v-95.486h-189.39v190.97h189.39zm-247.79 31.566v-41.824h-41.035v83.649h41.035zm-45.77-3.9457v-42.613h33.144v-23.674h-187.81v108.9h154.67zm33.144-82.86v-11.837h-31.565v-91.54h-118.37v-11.048h-37.879v126.26h187.81zm11.048-59.974v-43.402h-37.879v86.805h37.879zm172.03 0.7891v-14.204h4.7348v28.409h72.601v-157.04c-20.522-0.7536 0 0-61.556 0l4e-3 -90.751h-48.927v89.962h-67.866v33.144h71.022v4.7349h-93.118v93.118h89.962v11.048h-4.7348v-6.313h-74.179v22.096h112.06zm0-58.396v-29.987h4.7348v59.974h-4.7348zm0-55.24v-11.048h4.7348v22.096h-4.7348zm-172.03 52.083v-12.626h-156.25v25.252h156.25zm-160.98-7.8915v-9.4696h146.78v-31.505l7.1022 0.9734 7.1022 0.9736v-90.391h-15.783v-42.613h-140.47v74.179h-42.613v107.32h37.879zm295.14-103.38v-24.463h-85.227v48.926h85.227zm115.21-18.15v-42.614h-56.818v85.227h56.818zm-410.35-60.764v-79.703h-37.879v159.41h37.879zm238.32 14.994v-34.722h-28.409v69.444h28.409zm56.818 18.939v-15.783h-52.083v31.566h52.083zm0-37.09v-16.572h-52.083v33.144h52.083zm115.21-35.511v-52.083h-56.818v104.17h56.818zm-265.15 24.463v-19.728h15.783v-99.431h-15.783v-26.831h-181.5v75.757h41.035v89.962h140.47zm149.94-33.933v-23.674h-85.227v47.348h85.227zm-271.46-134.15v-17.361h4.7348v34.722h83.649v-33.144h4.7348v33.144h33.144v-61.553h-186.24v61.553h59.974zm124.68-96.275v-6.313h58.396v-153.09h-243.05v151.51h26.831v14.204h157.83z" />' +
            '</g>' +
            '<g transform="translate(71.37)" fill="#fff">' +
            '<path transform="matrix(.26458 0 0 .26458 -187.1 -416.07)" d="m423.39 4164.1v-59.185h-18.939v-931.18h460.86v1049.6h-441.92zm61.553 31.566v-18.15h113.64v36.3h33.144v-214.65h53.661v-80.492h7.8914v-45.77h-7.8914v-44.192h-53.661v-37.879h-18.939v25.252h-129.42v-25.252h-69.444v304.61h18.939v118.37h52.083zm12.626-74.968v-26.831h-10.532l-1.0471-80.752-1.0471-80.752v-89.443h115.21v143.62h-4.7348v160.98h-97.853zm37.879 3.9457v-18.15h-33.144v36.3h33.144zm17.361-6.3131v-24.463h-12.626v48.926h12.626zm37.879 0v-24.463h-33.144v48.926h33.144zm-55.24-20.518v-3.9457h-33.144v7.8914h33.144zm55.24-32.355v-23.674h-99.431v47.348h99.431zm0-52.872v-24.463h-99.431v48.926h99.431zm4.7348-97.853v-67.077h-29.987v42.613h-75.757v91.54h105.74zm-34.722-48.137v-18.939h-71.022v37.878h71.022zm33.144 331.44v-15.783h-104.17v31.566h104.17zm261.99-18.15v-33.933h-219.38v67.866h219.38zm-197.28-81.281v-42.613h-22.096v85.227h22.096zm197.28-26.042v-68.655h-219.38v47.348h26.831v89.962h192.55zm0-124.68v-51.294h-157.83v26.831h-7.8914v75.757h165.72zm0-106.53v-50.505h-165.72v77.336h7.8914v23.674h157.83zm-170.45-33.933v-16.572h-48.927v33.144h48.927zm-77.335-6.3131v-10.259h-119.95v20.518h119.95zm-132.58-74.968v-59.974h12.626v-11.048h26.831v-3.1565h26.831v4.7348h88.383v-4.7348h26.831v4.7348h82.07v-4.7348h26.831v4.7348h25.252v9.4697h12.626v119.95h52.083v-566.6h-52.083v121.53h-14.204v9.4696h-25.252v3.1566h-28.409v-3.1566h-86.805v3.1566h-26.831v-3.1566h-82.07v3.1566h-25.252v-4.7348h-28.409v-7.8914h-12.626v-121.53h-59.974v566.6h61.553zm-23.674-223.33v-111.27h374.05v222.54h-374.05zm183.08 66.673v-39.861l-7.7793-3.5688-7.7793-3.569-3.2654-5.2834-3.2654-5.2834-0.97851-4.8925-0.97848-4.8927 1.0644-5.6739 1.0644-5.6739 5.5389-6.1309 5.5389-6.1309 10.84-3.5775v-78.669h-178.35v17.361h27.683l23.588 6.5366 18.962 9.9097 22.105 22.221 5.1952 10.595 5.1952 10.595 2.2698 10.711 2.2698 10.712v15.783l-2.3298 11.048-2.3299 11.048-5.0037 10.259-5.0037 10.259-23.946 23.946-20.518 10.007-22.096 4.6596-26.042 0.06v17.361h178.35zm186.24 31.386v-8.4747l-41.824-1.5073-11.389-4.0102-11.389-4.0104-10.012-7.1442-10.012-7.1444-5.5964-6.8425-5.5964-6.8422-9.6864-17.361-2.8151-9.4696-2.8151-9.4697 0.11206-16.572 0.11222-16.572 4.0741-11.647 4.0741-11.647 5.8184-8.7632 5.8184-8.7631 15.445-14.809 18.716-9.9753 7.5703-2.4461 7.5703-2.446 41.824-1.7262v-16.949h-181.5v78.572l4.3402 1.0831 4.3402 1.0834 10.035 6.186 6.5371 13.504-0.0345 5.4202-0.0345 5.4203-6.0603 13.35-10.315 6.2729-8.808 1.9345v80.241h181.5v-8.4745zm-327.43-16.023 9.4067-2.4016 20.404-9.9316 20.707-20.997 9.8478-20.297 1.073-3.5825 1.073-3.5825-11.721 7.9541h-87.943v55.24h27.746zm327.43-25.218v-27.62l-84.438-0.03-11.214-3.1152-10.093-9.868 0.0178 0.5818 0.0178 0.5815 2.3451 7.7304 2.3451 7.7304 10.958 19.594 10.17 9.5133 10.17 9.5136 8.9741 4.3905 8.9741 4.3906 16.263 3.9449 17.756 0.1342 17.756 0.1357zm-287.25-56.818v-24.463h-77.335v48.926h77.335zm13.902 21.268 5.2212-3.1832 6.0603-13.35 0.0345-5.1922 0.0345-5.1924-3.2202-6.3121-3.2202-6.3122-5.0657-3.0886-5.0657-3.0888h-3.9458v48.927h3.9457l5.2211-3.1832zm189.7-21.289v-24.485l-5.9186 2.4036-5.9185 2.4034-4.2699 4.9707-4.2699 4.9707-1.012 4.6075-1.012 4.6074 1.0045 5.3542 1.0044 5.3541 8.3984 9.981 4.8131 2.0964 4.813 2.0964 2.3674 0.124v-24.484zm83.649 0.024v-24.463h-78.914v48.926h78.914zm-186.24-0.7501v-22.057l-8.6805 3.2886-3.5053 3.2836-3.5053 3.2835-1.7931 5.4332-1.7931 5.4331 0.9811 4.9056 0.98113 4.9055 4.8604 7.4179 10.087 6.1507h2.3674v-22.057zm14.366 18.474 5.3628-3.5826 5.5191-10.985-6e-3 -9.4696-6.1506-10.087-3.6265-2.2888-3.6265-2.289-7.1022-2.1196v44.404h4.268l5.3628-3.5826zm80.675-44.471 5.8678-2.451h85.328v-55.24l-32.355 0.048-9.9825 2.3534-9.9825 2.3533-17.765 8.662-18.025 16.659-10.009 15.597-2.829 7.546-2.8289 7.5462-1.1713 3.9457-1.1713 3.9457 4.5277-4.2566 4.5277-4.2565 5.8679-2.4512zm-179.58-9.6509-5.8907-11.922-19.262-19.685-22.421-11.627-10.096-2.3798-10.096-2.3799-26.042-0.048v55.101l89.737 0.9282 4.4527 3.3569 4.4527 3.3572 0.52822-1.3906 0.52821-1.3907-5.8907-11.922zm248.68 262.09v-57.607h-12.626v-9.4696h-26.831v-4.7349h-15.783v4.7349h-91.54v-4.7349h-17.361v4.7349h-97.853v-4.7349h-17.361v3.1566h-26.831v11.048h-12.626v115.21h318.81zm-261.99-381.16v-1.5783h89.962v3.1566h17.361v-3.1566h96.275v3.1566h18.939v-3.1566h25.252v-9.4696h14.204v-116.79h-320.39v116.79h12.626v7.8914h28.409v4.7348h17.361zm247.79-149.15v-16.572h-370.89v33.144h370.89zm42.613 0v-16.572h-37.879v33.144h37.879zm28.409 0v-16.572h-23.674v33.144h23.674zm129.42 491.63v-531.88h464.01v1063.8h-464.01zm222.54 488.48v-33.933h-22.096v-15.783h-50.505v15.783h-58.396v-53.661h-82.07v121.53h213.07zm113.64 0v-33.933h-47.348v31.566h-61.553v36.3h108.9zm118.37 0v-33.933h-113.64v67.866h113.64zm-170.45-20.518v-13.415h-56.818v26.831h56.818zm-138.89-42.613v-24.463h-48.926v48.926h48.926zm274.62 18.939v-5.5239h-214.65v11.048h214.65zm34.722-171.24v-176.77h-445.07v299.87h415.09v53.661h29.987zm-411.93 0.7892v-112.85h15.783v-48.926h14.204v-6.313h28.409v-2.3674h148.36v2.3674h85.227v-4.7349h28.409v4.7349h26.831v6.313h14.204v48.926h15.783v225.69h-377.21zm184.66 67.38v-39.153l-12.545-5.5349-5.4989-6.4241-5.4991-6.4244-1.0072-6.7168-1.0072-6.717 3.0946-6.8856 3.0947-6.8855 3.787-3.4758 3.7872-3.4757 5.8969-2.464 5.897-2.4638v-31.523h-93.118v1.1609l14.176 21.139 3.5218 11.341 3.5217 11.34-0.1025 16.572-0.1027 16.572-3.5228 10.259-3.523 10.259-4.0744 7.1022-4.0742 7.1023-6.1685 7.4437-6.1683 7.4438-10.605 7.0501-10.604 7.0498-8.6267 3.1332-8.6268 3.1331-8.3636 1.7071-8.3637 1.7069h-23.519v15.783h178.34v-39.153zm186.24 31.262v-7.8913l-13.81-0.016-13.81-0.015-20.311-3.2954-15.99-6.7399-8.6805-5.8645-8.6804-5.8648-5.8198-6.0722-5.8197-6.0723-5.6801-9.4696-5.6801-9.4697-2.9117-9.4696-2.9118-9.4697-1.1113-9.6889-1.1112-9.6887 1.8794-12.398 1.8794-12.398 3.1118-8.3171 3.1118-8.317 10.924-16.233 0.8226-1.3309 0.8224-1.3309h-90.148v31.664l5.524 1.6804 5.059 2.4776 5.0591 2.4773 7.8147 11.809 1.0263 5.4708 1.0263 5.4705-1.7483 6.4928-1.7482 6.4926-7.8982 9.3864-7.0573 2.6952-7.0574 2.6952v78.485h179.92zm-319.14-18.93 9.9301-3.4999 15.824-10.885 3.9944-3.4653 3.9946-3.4654 6.7213-10.259 6.7214-10.259 2.5982-6.7028 2.598-6.703-5.8804 3.1519-5.8805 3.1516h-86.063v54.059l35.511-1.6228zm319.14-22.015v-26.74l-89.712-0.9699-14.352-10.122 7.3161 20.156 10.333 16.103 8.547 7.6178 8.5468 7.6177 18.027 8.906 15.783 3.9037 17.756 0.1341 17.756 0.1343v-26.741zm-288.82-57.697v-24.463h-75.757v48.926h75.757zm14.121 22.139 4.4948-2.3244 3.3182-6.8544 3.3181-6.8544v-11.731l-2.164-5.0787-2.1639-5.0787-3.7545-3.3696-3.7546-3.3698-7.1022-2.1539v49.139h3.3133zm191.05-22.1v-24.424l-4.3402 1.6444-4.3403 1.6443-3.7545 3.446-3.7546 3.446-4.328 10.158 0.018 5.18 0.018 5.1801 7.4656 12.333 5.3343 2.8423 5.3342 2.8424 2.3674 0.132v-24.424zm83.649-0.041v-24.463h-77.336v48.927h77.336zm-186.24-0.7501v-22.057l-4.3374 1.6492-4.3373 1.649-2.9827 2.652-2.9827 2.6522-2.1496 5.0788-2.1496 5.0785v8.782l3.1362 5.1437 3.1362 5.1439 5.1439 3.1362 5.1438 3.1363h2.3674v-22.057zm16.83 17.791 3.4153-2.2324 2.6833-5.6549 2.6836-5.6551-0.7888-6.9987-0.789-6.9987-4.3472-4.5377-4.3473-4.5375-4.5137-1.5735-4.5135-1.5735v44.24l3.5511-1.1229 3.5511-1.1232zm75.189-43.488 6.623-3.5401 87.594-1.0116v-53.439h-9.4697v23.674h-72.441l-6.9693 9.8643-6.9693 9.8642-4.1585 10.528-4.1583 10.528 0.048 1.3092 0.048 1.309 3.2299-5.5462 6.6229-3.5399zm-174.05-1.8631-1.4628-3.8472-8.155-16.093-11.248-12.45-65.188-0.8517-0.4634-11.443-0.4635-11.442h-9.3314v53.661l84.438 0.082 12.626 5.9747 0.3556 0.1278 0.3555 0.1279zm-29.236-39.733-3.1567-2.445-9.0588-4.6216-9.0588-4.6218-19.761-4.6591-11.837-0.048v18.939l56.029-0.094-3.1565-2.4448zm111.27-17.972v-20.517h-164.14v15.783l8.6806 0.06 22.005 4.6613 22.186 10.717 11.048 9.6911 100.22 0.127v-20.518zm109.41 14.275 8.2686-6.2429 8.8909-4.0704 8.8909-4.0703 10.787-2.2857 10.787-2.2855 14.994-0.06v-15.783h-165.72v41.035h94.832l8.2686-6.2429zm62.618-3.227v-9.4697l-18.15 0.048-19.789 4.6656-14.963 7.5824-7.8612 6.5396 60.764 0.108v-9.4697zm-340.91-23.674v-7.8911h-9.4697v15.783h9.4697zm355.11 0v-7.8911h-9.4697v15.783h9.4697zm-14.204-36.3v-22.096h-14.204v-6.3129h-26.831v-4.7349h-18.939v4.7349h-94.696v-2.3676h-138.89v2.3676h-28.409v6.3129h-14.205v44.192h336.17zm-88.383 278.57v-16.572h-160.98v33.144h160.98zm108.9 0v-16.572h-104.17v33.144h104.17zm34.722-632.89v-306.97h-445.07v613.95h445.07z" />' +
            '</g>' +
            '<g id="svgBathrooms" fill="rgb(255,255,255,0)">' +
            '<a id="square1">' +
                '<rect rx="4" x="-87.117" y="-325.24" width="15" height="15" id="br0" />' +
            '</a>' +
            '<a id="square2">' +
                '<rect rx="4" x="-169.82" y="-633.86" width="15" height="15" id="br1" />' +
            '</a>' +
            '<a id="square3">' +
                '<rect rx="4" x="-80.306" y="-583.9" width="15" height="15" id="br2" />' +
            '</a>' +
            '<a id="square4">' +
                '<rect rx="4" x="112.01" y="-479.73" width="15" height="15" id="br3" />' +
            '</a>' +
            '<a id="square5">' +
                '<rect rx="4" x="136.73" y="-479.73" width="15" height="15" id="br4" />' +
            '</a>' +
            '<a id="square6">' +
                '<rect rx="4" x="185.07" y="-537.51" width="15" height="15" id="br5" />' +
            '</a>' +
            '<a id="square7">' +
                '<rect rx="4" x="-80.306" y="-563.96" width="15" height="15" id="br6" />' +
            '</a>' +
            '<a id="square8">' +
                '<rect rx="4" x="-90.519" y="-163.06" width="15" height="15" id="br7" />' +
            '</a>' +
            '<a id="square9">' +
                '<rect rx="4" x="-195.64" y="-131.72" width="15" height="15" id="br8" />' +
            '</a>' +
            '<a id="square10">' +
                '<rect rx="4" x="-195.64" y="-30.341" width="15" height="15" id="br9" />' +
            '</a>' +
            '<a id="square11">' +
                '<rect rx="4" x="-76.534" y="58.283" width="15" height="15" id="br10" />' +
            '</a>' +
            '<a id="square12">' +
                '<rect rx="4" x="9.5443" y="301.64" width="15" height="15" id="br11" />' +
            '</a>' +
            '<a id="square13">' +
                '<rect rx="4" x="-75.362" y="521.58" width="15" height="15" id="br12" />' +
            '</a>' +
            '<a id="square14">' +
                '<rect rx="4" x="-75.362" y="547.49" width="15" height="15" id="br13" />' +
            '</a>' +
            '<a id="square15">' +
                '<rect rx="4" x="-224.37" y="599.32" width="15" height="15" id="br14" />' +
            '</a>' +
            '<a id="square16">' +
                '<rect rx="4" x="-224.37" y="637.51" width="15" height="15" id="br15" />' +
            '</a>' +
            '<a id="square17">' +
                '<rect rx="4" x="-31.033" y="634.1" width="15" height="15" id="br16" />' +
            '</a>' +
            '<a id="square18">' +
                '<rect rx="4" x="-31.033" y="654.56" width="15" height="15" id="br17" />' +
            '</a>' +
            '<a id="square19">' +
                '<rect rx="4" x="29.663" y="707.42" width="15" height="15" id="br18" />' +
            '</a>' +
            '<a id="square20">' +
                '<rect rx="4" x="-141.85" y="707.07" width="15" height="15" id="br19" />' +
            '</a>' +
            '<a id="square21">' +
                '<rect rx="4" x="280" y="-241.58" width="15" height="15" id="br20" />' +
            '</a>' +
            '<a id="square22">' +
                '<rect rx="4" x="280" y="-220.51" width="15" height="15" id="br21" />' +
            '</a>' +
            '<a id="square23">' +
                '<rect rx="4" x="20.068" y="94.523" width="15" height="15" id="br22" />' +
            '</a>' +
            '<a id="square24">' +
                '<rect rx="4" x="41.286" y="94.523" width="15" height="15" id="br23" />' +
            '</a>' +
            '<a id="square25">' +
                '<rect rx="4" x="156.47" y="94.523" width="15" height="15" id="br24" />' +
            '</a>' +
            '<a id="square26">' +
                '<rect rx="4" x="177.69" y="94.523" width="15" height="15" id="br25" />' +
            '</a>' +
            '<a id="square27">' +
                '<rect rx="4" x="10.267" y="-116.28" width="15" height="15" id="br26" />' +
            '</a>' +
            '<a id="square28">' +
                '<rect rx="4" x="-77.981" y="-30.376" width="15" height="15" id="br27" />' +
            '</a>' +
            '<a id="square29">' +
                '<rect rx="4" x="19.099" y="-289.25" width="15" height="15" id="br28" />' +
            '</a>' +
            '<a id="square30">' +
                '<rect rx="4" x="40.902" y="-289.25" width="15" height="15" id="br29" />' +
            '</a>' +
            '<a id="square31">' +
                '<rect rx="4" x="174.93" y="-307.58" width="15" height="15" id="br30" />' +
            '</a>' +
            '<a id="square32">' +
                '<rect rx="4" x="174.93" y="-286.51" width="15" height="15" id="br31" />' +
            '</a>' +
            '<a id="square33">' +
                '<rect rx="4" x="115.88" y="-181.87" width="15" height="15" id="br32" />' +
            '</a>' +
            '<a id="square34">' +
                '<rect rx="4" x="165.54" y="-121.11" width="15" height="15" id="br33" />' +
            '</a>' +
            '</g>' +
        '</g>' +
        '</svg>' +
    '</div>'
    )
}

//ida b wells

function idaMap() {
    $('.map').html(
    '<div id="mapHolder">' +

        '<svg id="mapSvg" viewBox="0 0 470 1180">' +

        '<g style="font-family:monospace;font-size:23.518px;text-align:center;text-anchor:middle;fill:#fff;">' +
            '<text x="41.522312" y="14.863565">' +
            '<tspan x="41.522305" y="14.863565">ground</tspan>' +
            '</text>' +
            '<text x="28.446121" y="418.72464">' +
            '<tspan x="28.446121" y="418.72464">main</tspan>' +
            '</text>' +
            '<text x="46.978565" y="815.10394">' +
            '<tspan x="46.978565" y="815.10394">floor 2</tspan>' +
            '</text>' +
        '</g>' +

        '<g id="svgBathrooms" fill="rgb(255,255,255,0)">' +
            '<a id="square1">' +
            '<rect rx="4" x="295.82" y="70.654" width="15" height="15" id="br0" />' +
            '</a>' +
            '<a id="square2">' +
            '<rect rx="4" x="142.07" y="472.95" width="15" height="15" id="br1" />' +
            '</a>' +
            '<a id="square3">' +
            '<rect rx="4" x="308.34" y="472.95" width="15" height="15" id="br2" />' +
            '</a>' +
            '<a id="square4">' +
            '<rect rx="4" x="141.77" y="867.33" width="15" height="15" id="br3" />' +
            '</a>' +
            '<a id="square5">' +
            '<rect rx="4" x="308.04" y="867.33" width="15" height="15" id="br4" />' +
            '</a>' +
        '</g>' +

        '<g id="svgButtons" style="fill:#E08300;">' +
            '<a id="button1">' +
            '<rect x="316.33" y="133.99" width="18.865" height="37.802" />' +
            '</a>' +
            '<a id="button2">' +
            '<rect x="140.05" y="534.07" width="21.376" height="26.827" />' +
            '</a>' +
            '<a id="button3">' +
            '<rect x="320.28" y="534.06" width="22.694" height="38.696" />' +
            '</a>' +
            '<a id="button4">' +
            '<rect x="140.02" y="929.64" width="21.977" height="27.219" />' +
            '</a>' +
            '<a id="button5">' +
            '<rect x="320.58" y="929.68" width="22.434" height="30.313" />' +
            '</a>' +
        '</g>' +

        '<g fill="#fff">' +
            '<path d="m98.512 296.06v-79.043h-81.231v-85.433h29.937v-92.087h48.844v54.621h227.06v-54.096h108.89v79.831h22.059v61.449h-46.394v4.2016h-37.29v189.25h-58.823v-212.36h-155.46v126.57h7.8781v86.134h-65.475zm29.062 69.064v-7.3529h-26.436v14.706h26.436zm33.789-8.0094 2e-5 -15.362-32.038 0.091v30.634h32.038zm172.97 7.7468v-7.2654h-20.133v14.531h20.133zm11.029-112.31v-119.57h84.033v-15.097l-0.39391 0.10566-0.3939 0.10545-102.85 4e-3v5.4273h-149.51v-8.0532h-14.881v8.0532h-16.106v70.028h-44.992v20.832h22.933v18.032h-4.3768v107.67h4.3768v15.931h4.3768v-16.106h33.789v-4.0265h-35.189v-91.386h2.4509v-37.815h24.86v-46.919h6.1273v-23.81h1.7507v23.81h14.706v-23.81h1.7507v23.81h103.64v-26.785h54.621v239.13h9.2786zm22.408 103.99v-15.581h-20.658v31.163h20.658zm-256.19-0.70028h9.877v-14.005h-20.308v14.218l0.55384-0.21256zm222.76-13.13v-13.13h-20.133v26.26h20.133zm-217.26-48.319v-45.693h-15.931v91.386h15.931zm250.69 29.236v-15.581h-20.658v31.163h20.658zm-228.46-22.234v-32.738h-11.379v65.475h11.379zm22.059 11.467v-21.271h-7.8781v-32.912h-10.854v-12.43h-3.3264v12.43h-11.379v8.2281h13.13v67.226h20.308zm172.97 1.9258v-13.043h-20.133v26.084h20.133zm33.437-24.246v-15.756h-20.658v31.512h20.658zm-33.437-3.6764v-13.13h-20.133v26.26h20.133zm33.437-29.498v-15.669h-20.658v31.337h20.658zm-33.437 1.313v-13.305h-20.133v26.61h20.133zm-196.78-7.0903v-5.3395h-9.6288v10.679h9.6288zm15.931 0v-5.3395h-9.1036v10.679h9.1036zm-36.415-11.992v-7.1777h-15.931v14.356h15.931zm36.415-13.13v-18.032h-23.109v36.063h23.109zm180.85 4.0265v-13.13h-20.133v26.26h20.133zm33.437-6.3025v-15.581h-20.658v31.163h20.658zm-246.5-0.78781v-7.2654h-20.133v14.531h20.133zm213.06-21.008v-13.218h-20.133v26.436h20.133zm-235.83 0.70028v-11.292h44.992v-95.062h-50.07v-54.621h-43.592v92.26h-29.937v80.007h78.605zm269.26-11.73v-15.494h-19.034l-1.6245-0.22249v31.21h20.658zm-33.437-11.292v-7.3529h-20.133v14.528l20.045 0.0935 0.0877 0.0848zm70.727 1.6631v-1.1379h-35.538v2.276h35.538zm46.394-25.034v-21.972h-104.34v39.213l22.321 0.0901 0.0488 2.3196 0.0488 2.3196h81.922zm-136.03-3.8516v-18.12h-32.213v25.034h30.987v11.204h1.2255zm18.907 0v-18.12h-17.157v36.239h17.157zm117.12-25.123v-5.252h-20.308v10.504h20.308zm-291.84-18.47v-12.517h-14.356v25.034h14.356zm33.088 0v-12.517h-14.706v25.034h14.706zm88.584 0v-12.517h-86.835v25.034h86.835zm25.911 0v-12.517h-24.159v25.034h24.159zm16.807 0v-12.517h-15.056v25.034h15.056zm105.39-29.85v-36.764h-103.64v73.529h103.64zm-253.15 25.822v-8.4907h-14.881v16.982h14.881z" />' +
            '<path d="m105.22 697.2v-79.381h-81.41v-103.49h29.668v-75.053h49.448v55.098h227.81v-55.628h108.56l1.1037 0.22068v80.307h21.721v63.222h-84.237v193.9h-59.336v-213.5h-155.05v128.74h7.9469v84.944h-66.224zm33.729 69.845v-6.8873h-31.08v13.775h31.08zm29.846-12.45v-19.337h-28.079v38.675h28.079zm173.24 12.45v-6.7106h-20.838v13.421h20.838zm11.302-113.64v-120.35h84.414v-15.011h-104.37v5.8277h-291.22v10.772h-15.717v4.2383h21.014v76.29h80.528v-63.752h-40.264v-16.6h-26.667v-1.766h68.695v225.33h9.1831v-225.33h204.85v240.7h9.5362zm21.899 106.49v-13.863h-20.132v27.726h20.132zm-33.199-14.657v-13.333h-20.838v26.667h20.838zm-214.04 5.651v-7.5053h-20.132v15.011h20.132zm247.23-20.309v-13.686h-20.132v27.372h20.132zm-247.23-6.5342v-17.571h-20.132v35.143h20.132zm40.794-10.154v-19.602h-28.079v39.204h28.079zm173.24 2.9138v-13.333h-20.838v26.667h20.838zm33.199-15.717v-14.039h-20.132v28.079h20.132zm-247.23-13.775v-17.395h-20.132v34.789h20.132zm214.04 0.97128v-13.421h-20.838v26.842h20.838zm-181.19-14.216v-18.454h-20.132v36.908h20.132zm214.4-2.7372v-13.951h-20.132v27.902h20.132zm-33.199-11.479v-13.245h-20.838v26.49h20.838zm-214.04-9.0064v-17.306h-20.132v34.614h20.132zm247.23-9.3596v-13.951h-20.132v27.902h20.132zm-214.4-6.0926v-18.454h-20.132v36.908h20.132zm181.19-3.7968v-13.245h-20.838v26.49h20.838zm-214.04-7.2404v-7.4171h-20.132v14.834h20.132zm247.23-12.538v-13.951h-20.132v27.902h20.132zm-33.199-8.7415v-13.51h-20.838v27.019h20.838zm-301.98-0.70639v-12.803h-13.598v25.607h13.598zm5.651-24.458v-37.263h-19.249v47.151h15.364v27.372h3.8852zm115.14 18.987v-18.275l-20.132-0.0939 4e-5 18.322 4e-5 18.322h20.132zm214.4-12.365v-11.567h-20.132v23.133h20.132zm-33.199-3.7968v-7.064h-20.838v14.128h20.838zm54.039-4.3266v-3.4436h-19.072v6.8873h19.072zm21.369 0v-3.4436h-19.602v6.8873h19.602zm20.309 0v-3.4436h-18.543v6.8873h18.543zm21.721-7.3288v-10.772h-19.955v21.544h19.955zm-298.62 0.26489v-7.3288h-20.132v14.657h20.132zm181.19-15.982v-18.543h-20.838v37.085h20.838zm22.604 12.627v-5.2097h10.596v-25.96h-20.132v36.378h9.5362zm10.596 0.88298v-4.3266h-8.8298v8.6533h8.8298zm62.515-13.868v-18.184h-60.749v36.38l60.749-0.0126v-18.183zm-276.91-5.4692v-12.715h-20.132v25.43h20.132zm23.488 6.9755v-5.7395h-5.1212v-13.951h-10.596v13.951h-6.0044v11.479h21.721zm22.428-6.9755v-12.715h-20.662v25.43h20.662zm22.428 0v-12.715h-20.662v25.43h20.662zm22.604 0v-12.715h-20.838v25.43h20.838zm22.074 0v-12.715h-20.346l0.10717 0.27933 0.10718 0.27935v24.871h20.132zm23.133 0v-12.715h-21.192v25.43h21.192zm22.428 0v-12.715h-20.662v25.43h20.662zm140.04-1.8543v-10.861h-19.955v21.721h19.955zm-331.47-3.4436v-7.4171h-38.497v14.834h38.497zm38.852-1.3245v-6.0926h-4.2383v12.185h4.2383zm17.483 0v-6.0926h-3.3554v12.185h3.3554zm275.14-13.421v-5.5628h-19.955v11.126h19.955zm-419.06 0.88299v-4.5032h-13.951v9.0064h13.951zm13.951-8.8298v-2.5607h-27.902v5.1212h27.902zm7.5937-4.6799v-7.2404h-5.8277v14.481h5.8277zm11.479 3.9734v-3.267h-6.7106v-57.395h8.4766v41.501h9.0064v-47.504h-20.485v69.932h9.7129zm33.024-7.0639v-10.331h-31.258v20.662h31.258zm28.961 4.5032v-5.8277h-27.197v11.655h27.197zm14.657-6.7106v-12.538h-12.715v25.077h12.715zm16.247 0v-12.538h-14.481v25.077h14.481zm37.263 0v-12.538h-35.496v25.077h35.496zm36.733 0v-12.538h-34.966v25.077h34.966zm37.085 0v-12.538h-35.319v25.077h35.319zm37.615 0v-12.538h-35.848v25.077h35.848zm16.6 0v-12.538h-14.834v25.077h14.834zm106.14-30.64v-37.35h-104.37v74.7h104.37zm-364.32 7.9468v-26.932h-4.9448v53.861h4.9448zm46.974 15.982v-5.8277h-12.185v11.655h12.185zm15.011 0v-5.8277h-13.245v11.655h13.245zm-73.464-7.0639v-10.066h-5.8277v20.132h5.8277zm44.502 2.5607v-1.3245h-6.1808v-25.43h-14.304v28.079h20.485zm-44.502-31.258v-16.865h22.251v-8.3h-28.079v42.031h5.8277zm38.322-3.8852v-6.6224h-14.304v13.245h14.304zm0-14.834v-6.4457h-14.304v12.892h14.304z" />' +
            '<path d="m318.81 1065.7v-107.16h-154.82v128.67h5.919l1.6295 0.2235-0.0884 85.174-65.978 0.089-0.13954-0.2198-0.13952-0.22-6e-3 -158.77h-81.272v-95.841h29.313v-82.149h49.799l0.22548 2.8963 8.6e-4 25.847 8.6e-4 25.847h227.85v-54.942h109.53v79.867l21.151 4e-3 0.39495 0.10593 0.39495 0.10575v62.097l-2.3697 0.0166-81.71 0.029v195.5h-59.682v-107.16zm23.521 97.508v-7.0213h-20.888v14.042h20.888zm10.883-113.74v-120.77h84.782v-14.569h-104.08l-0.0962 6.0559-307.27 0.0878v8.4254h103.56v241.36h8.9522v-241.36h205.02v241.53h9.1278zm22.644 97.42v-23.346h-20.888v46.691h20.888zm-247.5 16.061v-7.1091h-20.362v14.218h20.362zm40.548-32.912v-40.021h-7.548v-21.767h-20.537v101.81h28.086zm173.43 0.79v-23.61h-20.888v47.218h20.888zm-213.98 15.974v-7.109h-20.362v14.218h20.362zm0-35.545v-26.506h-20.362v53.01h20.362zm247.5-12.814v-23.346h-20.888v46.691h20.888zm-33.526-16.5v-23.521h-20.888v47.043h20.888zm-213.98-34.229v-35.106h-20.362v70.214h20.362zm247.5 2.1064v-23.346h-20.888v46.691h20.888zm-214.5-5.8802v-22.557h-20.537v45.111h20.537zm180.97-10.62v-23.346h-20.888v46.691h20.888zm33.526-32.736v-24.136h-20.888v48.271h20.888zm-214.5-3.1597v-22.204h-20.537v44.41h20.537zm-121.12 0.78989v-12.638h-13.692v25.277h13.692zm5.617-27.47v-40.108h-19.309v53.186h15.447v27.033h3.8618zm21.591 0v-40.108h-19.658l-0.08939 80.219h19.747zm38.618 31.946v-8.1624h22.293v-47.57h-22.293v-16.325h-36.686v80.219h36.686zm22.293 0.8776v-7.2847h-20.362v14.569h20.362zm213.98-19.045v-23.697h-20.888v47.394h20.888zm33.526-31.946v-22.117h-20.888v44.234h20.888zm84.079 0v-22.117h-82.149v44.234h82.149zm-298.58 12.989v-7.899h-20.537v15.798h20.537zm180.97-20.801v-14.306h-20.888v28.612h20.888zm-180.97-1.5798v-12.726h-20.537v25.453h20.537zm15.271 0v-12.726h-13.516v25.453h13.516zm15.271 0v-12.726h-13.516v25.453h13.516zm14.92 0v-12.726h-13.165v25.453h13.165zm22.82 0v-12.726h-21.064v25.453h21.064zm22.293 0v-12.726h-20.537v25.453h20.537zm22.467 0v-12.726h-10.313l-10.313-2e-5v25.453h10.313l10.313 3e-5zm22.82 0v-12.726h-21.064v25.453h21.064zm22.293 0v-12.726h-20.537v25.453h20.537zm-191.15-5.266v-7.2847h-20.537v14.569h20.537zm331.59-14.657v-5.4416h-20.186v10.883h20.186zm-382.3-17.641v-12.902h-21.767v25.803h21.767zm22.82 0v-12.902h-21.064v25.803h21.064zm23.17 0v-12.902h-21.414v25.803h21.414zm26.506 0v-12.902h-24.574v25.803h24.574zm15.974 0v-12.902h-14.218v25.803h14.218zm122.7 0v-12.902l-120.85-4e-5 0.0462 12.902 0.046 12.902h120.76zm25.803 0v-12.902h-24.047v25.803h24.047zm17.378 0v-12.902h-15.622v25.803h15.622zm106.02-30.543v-37.301h-104.09v74.601h104.09zm-337.54-10.532v-26.417h-44.585v52.836h44.585z" />' +
        '</g>' +
        '</svg>' +
    '</div>'  
    )
}
