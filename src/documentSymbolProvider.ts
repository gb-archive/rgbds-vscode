"use strict";

import * as vscode from 'vscode';
import { ASMSymbolDocumenter } from './symbolDocumenter';

export class ASMDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
  constructor(public symbolDocumenter: ASMSymbolDocumenter) {

  }

  provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SymbolInformation[]> {
    const table = this.symbolDocumenter.files[document.fileName];

    if (table == null) {
      return [];
    }

    const output: vscode.SymbolInformation[] = [];

    for (const name in table.symbols) {
      if (table.symbols.hasOwnProperty(name)) {
        const symbol = table.symbols[name];
        output.push(new vscode.SymbolInformation(name, symbol.kind, symbol.location.range));
      }
    }

    return output;
  }
}
