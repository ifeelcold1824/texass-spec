# 玩家行动
=====================

    行动
    |action     |description             
    |-----------|-----------------------
    |FLOD       |弃牌出局
    |BET        |下注*

    note: 下注不能超过自己的剩余筹码。
    IF 下注 = 0:
        显示为CHECK; 
    ELSE:
        IF 下注 = 前一名玩家:
            显示为CALL;
        ELSE:
            IF 下注 < 自己的剩余筹码:
                显示为RAISE；
            ELSE 如果 = 自己的剩余筹码
                显示为ALL-IN.

## FOLD

### 玩家可以选择FOLD行动

* 玩家选择FOLD
* 该玩家出局，游戏继续

## BET

### 玩家可以选择BET行动
* 玩家选择BET
* 该玩家留在游戏，游戏继续

### 玩家选择BET行动时，金额不能小于前一名玩家的BET

|BET of previous players    |intended BET    |status of BET action  |
|---------------------------|----------------|----------------------|
|1                          |0               |can't                 |
|1                          |1               |can                   |
|1                          |2               |can                   |
|0                          |0               |can                   |

* 前一名玩家按<BET of previous players>下注
* 该玩家<status of BET action>进行金额为<intended BET>的BET

### 玩家BET时，金额不能大于当前场上筹码最少玩家的筹码数

|minimal counter of current players    |intended BET    |status of BET action  |
|--------------------------------------|----------------|----------------------|
|10                                    |11              |cann't                |
|10                                    |10              |can                   |
|10                                    |9               |can                   |

* 当场上筹码最少玩家的筹码数为<minimal counter of current players>, 该玩家<status of BET action>进行金额为<intended BET>的BET
