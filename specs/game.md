# 游戏
=====================

* 开始一局游戏

## 如果第4回合结束后场上剩余的玩家大于1，游戏将在第4回合末结束
    回合结束时剩余玩家数量
    |1st-round  |2nd-round  |3rd-round  |4th-round  |game will end at |
    |-----------|-----------|-----------|-----------|-----------------|
    |4          |4          |4          |2          |4th-round        |
* 当回合结束时剩余玩家数量如以上用例
* 游戏将会在用例所给的回合结束
* 结算

## 回合结束时，如果场上剩余的玩家小于等于1，则游戏结束
    回合结束时剩余玩家数量
    |1st-round  |2nd-round  |3rd-round  |4th-round  |game will end at |
    |-----------|-----------|-----------|-----------|-----------------|
    |1          |0          |0          |0          |1st-round        |
    |2          |1          |0          |0          |2nd-round        |
    |3          |2          |0          |0          |3rd-round        |

* 当回合结束时剩余玩家数量如以上用例
* 游戏将会在用例所给的回合结束
* 结算

## 只要有玩家在回合内ALL IN，则游戏在该回合末结束
    有玩家ALL IN, 1:true, 0:false
    |1st-round  |2nd-round  |3rd-round  |4th-round  |game will end at |
    |-----------|-----------|-----------|-----------|-----------------|
    |1          |0          |0          |0          |1st-round        |
    |0          |1          |0          |0          |2nd-round        |
    |0          |0          |1          |0          |3rd-round        |

* 当回合结束时玩家ALL IN的情况如以上用例
* 游戏将会在用例所给的回合结束
* 结算