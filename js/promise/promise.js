/**
 * Created by zhouyu on 2017/7/4.
 */
var Promise = function (fn) {
  var promise = this;
  //状态机状态
  var promiseState = {
    pending: 0,
    fulfilled: 1,
    rejected: 2
  };
  //存储当前变量的回调函数和标记对象为 promise
  promise._fullCall = [], promise._rejCall = [];
  promise._name = "promise";
  //执行过程中的状态变化(初始化状态为默认状态)
  var _state = promiseState.pending;
  //回调函数的参数
  var _value = undefined;
  //状态变更
  function setState(stateT, valueT) {
    var promise = this;
    _state = stateT;
    _value = valueT;

  }
}