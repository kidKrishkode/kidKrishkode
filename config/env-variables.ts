module.exports = {
    themeSet: [
        [
            ["--bg-color", "#fff"],
            ["--mit-color", "#fcfafa"],
            ["--heading-color", "#22577aff"],
            ["--para-color", "#0c8ff0ff"],
            ["--target-color", "#272b28"],
            ["--verdigris", "#0c8ff0ff"],
            ["--emerald", "#1c6bac"],
            ["--reverse-white", "#000"],
            ["--reverse-black", "#fff"],
            ["--glass-color", "#ececec79"],
            ["--code-color", "#ebf0f4"],
            ["--code-li-color", "#fff"],
            ["--loader-back", "#fffffff6"],
            ["--loader-font", "#22577aff"]
        ],
        [
            ["--bg-color", "#0d1117"],
            ["--mit-color", "#161b22"],
            ["--heading-color", "#22577aff"],
            ["--para-color", "#0c8ff0ff"],
            ["--target-color", "#272b28"],
            ["--verdigris", "#0c8ff0ff"],
            ["--emerald", "#1c6bac"],
            ["--reverse-white", "#fff"],
            ["--reverse-black", "#000"],
            ["--glass-color", "#161b2279"],            
            ["--code-color", "#161b20"],
            ["--code-li-color", "#1E1E1E"],
            ["--loader-back", "#000000f6"],
            ["--loader-font", "#22577aff"]
        ]
    ],
    duplex: 1441,
    hash: [["0","*z"],["1","*y"],["2","*x"],["3","*w"],["4","*v"],["5","*u"],["6","*t"],["7","*s"],["8","*r"],["9","*q"],["&",0],["+",1],["=",2],["-",3],["a",4],["e",5],["i",6],["n",7],["u",8],["g",9],["r","!h"],["l","!i"],["t","!j"]],
    browser_data: [
        {
            name: "Chrome",
            version: 125
        },
        {
            name: "Microsoft Internet Explorer",
            version: 114
        },
        {
            name: "Firefox",
            version: 119
        },
        {
            name: "Safari",
            version: 80
        },
    ],
    error_templet: `
        <div class="workspace blbg" style="background: #0000009e;" id="errorPreview">
            <div class="errorView">
                <header class="flx"><img src="../public/favicon.png" alt="load"/>
                    <span style="cursor: pointer;" onclick="system.closePyError();">&times;</span>
                </header>
                <div class="error-message">
                    <i class="fa fa-times-circle-o"></i>
                    <h2>Error: <|error.code|>!</h2>
                    <small class="form-text text-muted">This error genaredted by system for handle unwanted useage of resource</small>
                    <p><|error.message|></p>
                <div class="btn btn-process" style="margin-top: 40px;" onclick="system.closePyError();"><i class="fa fa-refresh"></i> Re-try</div>
            </div>
        </div>`,
    traffic: {
        flow: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
        visitor: [7, 9, 16, 18, 18, 18, 20, 26, 33, 28, 37, 54]
    }
};