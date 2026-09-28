# Test case overview

| ID    | Area         | Scenario                                        | Type              | Automated in                            |
| ----- | ------------ | ----------------------------------------------- | ----------------- | --------------------------------------- |
| TC-01 | Auth         | Registered user logs in and sees name           | Positive          | ui/auth.spec.ts                         |
| TC-02 | Auth         | Wrong password shows an error                   | Negative          | ui/auth.spec.ts                         |
| TC-03 | Auth         | Signup with existing email is blocked           | Negative          | ui/auth.spec.ts                         |
| TC-04 | Registration | New user registers, logs in, deletes account    | E2E               | ui/registration.spec.ts                 |
| TC-05 | Products     | Search returns matching products                | Positive          | ui/products.spec.ts                     |
| TC-06 | Products     | Search without match shows nothing              | Negative          | ui/products.spec.ts                     |
| TC-07 | Products     | UI product count equals API count               | Consistency       | ui/products.spec.ts                     |
| TC-08 | Cart         | Empty cart message                              | Boundary          | ui/cart.spec.ts                         |
| TC-09 | Cart         | Add one product                                 | Positive          | ui/cart.spec.ts                         |
| TC-10 | Cart         | Add two products                                | Positive          | ui/cart.spec.ts                         |
| TC-11 | API          | productsList structure and content              | Contract          | api/products.api.spec.ts, Postman       |
| TC-12 | API          | Unsupported methods return responseCode 405     | Negative          | api/products.api.spec.ts, Postman       |
| TC-13 | API          | searchProduct with and without parameter        | Positive/Negative | api/products.api.spec.ts, Postman       |
| TC-14 | API          | User lifecycle create > verify > fetch > delete | E2E               | api/user-lifecycle.api.spec.ts, Postman |
| TC-15 | Performance  | Light load on home + API endpoints              | Performance       | JMeter                                  |

## Observation worth reporting

The API answers HTTP 200 for failures and encodes the error in the body (`responseCode`). Clients that only look at the HTTP status will treat errors as success. Suggested improvement: return real 4xx/5xx status codes.
