# ~~@rhao/web-utils~~

> ***废弃声明：该包已被废弃，推荐使用 [`nice-fns`](https://www.npmjs.com/package/nice-fns)，拥有完整的单测和文档！***

#### 迁移至指南

安装 `nice-fns`

```shell
# npm
npm i nice-fns

# yarn or pnpm
pnpm add nice-fns
```

函数迁移指南：

1. `arrayToDictionary` 更改调用方式
2. `createBEM.is` => `classState.is`
3. `createDictionary` 更改调用方式
4. `cssVarNameFactory` => `cssVarName`
5. `getParentScroll` 更改调用方式
6. `isClient()` => `isClient`
7. `pxToXxx` 功能优化
8. `pxWithRatio` => `scalePx`
9. `saveAs` 优化
10. `unitToPx` 支持 `vmin`、`vmax`
