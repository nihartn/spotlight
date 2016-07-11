Spotlight.BlockLimits = function(editor) {
  this.editor = editor;

}

Spotlight.BlockLimits.prototype.enforceLimits = function() {
  this.addEditorCallbacks();
  this.checkGlobalBlockTypeLimit()();
}

Spotlight.BlockLimits.prototype.addEditorCallbacks = function() {
  SirTrevor.EventBus.on('block:create:new', this.checkBlockTypeLimitOnAdd());
  SirTrevor.EventBus.on('block:remove', this.checkGlobalBlockTypeLimit());
}

Spotlight.BlockLimits.prototype.checkBlockTypeLimitOnAdd = function() {
  var editor = this.editor;

  return function(block) {
    var control = $("a[data-type='" + block.blockCSSClass() + "']", editor.outer);

    control.toggleClass("disabled", !editor.blockManager.canAddBlockType(block.class()));
  }
}

Spotlight.BlockLimits.prototype.checkGlobalBlockTypeLimit = function() {
  // we don't know what type of block was created or removed.. So, try them all.
  var editor = this.editor;

  return function() {
    $.each(editor.blockManager.blockTypes, function(i, type) {
      var block_type = SirTrevor.Blocks[type].prototype;

      var control = $(editor.outer).find(".st-block-control[data-type='" + block_type.type + "']");
      if (editor.blockManager._getBlockTypeLimit(type) < 0) {
        control.remove();
      } else {
        control.toggleClass("disabled", !editor.blockManager.canAddBlockType(type));
      }
    });
  }
}
