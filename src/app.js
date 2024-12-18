import express from "express";

export class AppFactory {
  async build() {
    return express();
  }
}
