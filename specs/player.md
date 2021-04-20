# 玩家行动
=====================

    行动
    |action     |description             
    |-----------|-----------------------
    |FLOD       |弃牌出局
    |BET        |下注*

    note: 下注不能超过自己的剩余筹码。
    IF 下注 = 0:
        称为CHECK; 
    ELSE:
        IF 下注 = 前一名玩家:
            称为CALL;
        ELSE:
            IF 下注 < 自己的剩余筹码:
                称为RAISE；
            ELSE 如果 = 自己的剩余筹码
                称为ALL-IN.

## FOLD
### 玩家可以在任意时刻FOLD并出局
* 玩家选择FOLD
* 该玩家出局，游戏继续

## BET
### 玩家BET时，金额不能超过当前场上筹码最少玩家的筹码数
    |minimal counter of current players    |intended BET    |status of BET action  |
    |--------------------------------------|----------------|----------------------|
    |10                                    |9               |true                  |
    |10                                    |10              |true                  |
    |10                                    |11              |false                 |
