module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        'sourceType': 'module'
    },
    "rules": {
        //必须使用四个空格进行缩进
        "indent": [
            "error",
            4
        ],
        "linebreak-style": "off",
        //必须使用单引号，不能使用双引号
        "quotes": [
            "error",
            "single"
        ],
        //语句结尾必须存在分号
        "semi": [
            "error",
            "always"
        ],
        // 禁止使用debugger
        "no-debugger": "error",
        // 禁止出现空语句
        "no-empty": "error",
        // 强制使用有效的JSDoc注释
        "valid-jsdoc": "error",
        // 禁止使用eval
        "no-eval": "error",
        // 禁止使用全局变量
        "no-implicit-globals": "error",
        // 强制使用严格模式
        "strict": ["error", "global"],
        // 禁止出现未使用的变量
        "no-unused-vars": ["error", {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": false
        }],
        // 在定义变量之前不允许使用变量
        "no-use-before-define": ["error", {
            "functions": true,
            "classes": true
        }]
    }
};