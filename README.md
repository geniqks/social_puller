# IOC Container

## Bind une classe 
Pour bind une classe, il faut utiliser le décorateur `@bind`

```typescript
@bind()
@injectable()
export class TwitterDriver extends BaseDriver {
  constructor(private readonly instagramDriver: InstagramDriver) {
    super();
  }
}
```
Il doit toujours être utilisé avant le décorateur `@injectable()` car le compilateur TypeScript exécute les décorateurs dans l'ordre inverse. Ainsi, `@bind()` sera exécuté après `@injectable()`, ce qui permet de définir correctement le scope de la classe après son injection.
