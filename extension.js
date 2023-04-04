const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // 絶対パスをコピーするコマンドを登録
  let disposableCopyAbsolutePath = vscode.commands.registerCommand(
    'copyAbsolutePathWithForwardSlash',
    (uri) => {
      const absolutePath = uri.fsPath.replace(/\\/g, '/');
      vscode.env.clipboard.writeText(absolutePath).then(() => {
        vscode.window.showInformationMessage('絶対パスをコピーしました: ' + absolutePath);
      });
    }
  );

  // 相対パスをコピーするコマンドを登録
  let disposableCopyRelativePath = vscode.commands.registerCommand(
    'copyRelativePathWithForwardSlash',
    (uri) => {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

      if (workspaceFolder) {
        const relativePath = path.relative(workspaceFolder.uri.fsPath, uri.fsPath).replace(/\\/g, '/');
        vscode.env.clipboard.writeText(relativePath).then(() => {
          vscode.window.showInformationMessage('相対パスをコピーしました: ' + relativePath);
        });
      } else {
        vscode.window.showErrorMessage('ファイルがワークスペース内にありません。');
      }
    }
  );

  context.subscriptions.push(disposableCopyAbsolutePath);
  context.subscriptions.push(disposableCopyRelativePath);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};