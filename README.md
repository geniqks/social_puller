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


# Tests

## Stubs


Here an example of how to stubs a class using jest
```ts
// Example of how to sub a class
test("stub prepareAndTriggerBrightData pour retourner salut", async () => {
  const brightDataController = container.get(BrightDataController);

  jest
    .spyOn(brightDataController, "prepareAndTriggerBrightData")
    .mockResolvedValue({
      snapshot_id: "123",
    });

  const result = await brightDataController.prepareAndTriggerBrightData(
    "instagram_posts",
    "/endpoint",
    ["https://example.com"]
  );

  expect(result).toEqual({
    snapshot_id: "123",
  });
});

```