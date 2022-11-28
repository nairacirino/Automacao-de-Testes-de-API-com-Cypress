import tokenFixture from "../../fixtures/token.json"
import productReviewFixture from "../../fixtures/product-review.json"
import statusFixture from "../../fixtures/status.json"
import productReviewWooCommerceSchema from "../../contracts/wooCommerce/productreview.contract"
import { faker } from "@faker-js/faker"

describe('Create a Product Review', () => {
    it('Should create a product review', () => {
        let reviewer_email = faker.internet.email()

        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {

            let id = response.body.id

            expect(response.status).to.eq(statusFixture.created)
            expect(response.body.product_id).to.eq(productReviewFixture.validReview.product_id)
            expect(response.body.review).to.eq(productReviewFixture.validReview.review)
            expect(response.body.reviewer).to.eq(productReviewFixture.validReview.reviewer)
            expect(response.body.reviewer_email).to.eq(reviewer_email)
            expect(response.body.rating).to.eq(productReviewFixture.validReview.rating)

            return productReviewWooCommerceSchema.validateAsync(response.body),

                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productReviewFixture.deleteReview.force
                )
        })
    })

    it('Should return status 409 when attempting to create a duplicated product review', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.created)
            cy.postProductReviewWooCommerce(
                tokenFixture.token,
                productReviewFixture.validReview.product_id,
                productReviewFixture.validReview.review,
                productReviewFixture.validReview.reviewer,
                reviewer_email,
                productReviewFixture.validReview.rating
            ).then((response) => {
                expect(response.status).to.eq(statusFixture.conflict)
            })
        })
    })

    it('Should return status 401 when attempting to create a product review informing an invalid token', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.invalidToken,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.unauthorized)
        })
    })

    it('Should return status 404 when attempting to create a product review informing an invalid product_id', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            99999999999999999999999999999,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.not_found)
        })
    })

    it('Should return status 400 when attempting to create a product review without informing product_id, review, reviewer or reviewer e-mail', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.bad_request)
        })
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.bad_request)
        })
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.bad_request)
        })
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.bad_request)
        })
    })

    it('Should create a product review with rating 0 when request body is missing the rating parameter', () => {
        let reviewer_email = faker.internet.email()

        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
        ).then((response) => {

            let id = response.body.id

            expect(response.status).to.eq(statusFixture.created)
            expect(response.body.rating).to.eq(0)

                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productReviewFixture.deleteReview.force
                )
        })
    })

    it('Should return status 400 when attempting to create a product review with invalid data type', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.invalidReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.bad_request)
        })
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.invalidReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.bad_request)
        })
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.invalidReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.bad_request)
        })
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.invalidReview.rating
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.bad_request)
        })
    })
})

describe('Update a Product Review', () => {
    it('Should update a product review', () => {
        let reviewer_email = faker.internet.email()

        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            let id = response.body.id

            cy.putProductReviewWooCommerce(
                tokenFixture.token,
                id,
                productReviewFixture.changeValidReview.product_id,
                productReviewFixture.changeValidReview.review,
                productReviewFixture.changeValidReview.reviewer,
                productReviewFixture.changeValidReview.reviewer_email,
                productReviewFixture.changeValidReview.rating
            ).then((updateResponse) => {
                expect(updateResponse.status).to.eq(statusFixture.ok)
                expect(updateResponse.body.id).to.eq(id)
                expect(updateResponse.body.product_id).to.eq(productReviewFixture.changeValidReview.product_id)
                expect(updateResponse.body.review).to.eq(productReviewFixture.changeValidReview.review)
                expect(updateResponse.body.reviewer).to.eq(productReviewFixture.changeValidReview.reviewer)
                expect(updateResponse.body.reviewer_email).to.eq(reviewer_email)
                expect(updateResponse.body.rating).to.eq(productReviewFixture.changeValidReview.rating)
            })

            return productReviewWooCommerceSchema.validateAsync(response.body),

                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productReviewFixture.deleteReview.force
                )
        })

    })

    it('Should return 401 when updating a product review without a valid token', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((postResponse) => {
            let id = postResponse.body.id
            cy.putProductReviewWooCommerce(
                tokenFixture.invalidToken,
                id,
                productReviewFixture.changeValidReview.product_id,
                productReviewFixture.changeValidReview.review,
                productReviewFixture.changeValidReview.reviewer,
                productReviewFixture.changeValidReview.reviewer_email,
                productReviewFixture.changeValidReview.rating
            ).then((updateResponse) => {
                expect(updateResponse.status).to.eq(statusFixture.unauthorized)
                cy.getProductReviewWooCommerce(
                    '/' + id,
                    tokenFixture.token
                ).then((getResponse) => {
                    expect(getResponse.status).to.eq(statusFixture.ok)
                    expect(getResponse.body.id).to.eq(id)
                    expect(getResponse.body.product_id).to.eq(productReviewFixture.validReview.product_id)
                    expect(getResponse.body.reviewer).to.eq(productReviewFixture.validReview.reviewer)
                    expect(getResponse.body.reviewer_email).to.eq(reviewer_email)
                    expect(getResponse.body.rating).to.eq(productReviewFixture.validReview.rating)
                })
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productReviewFixture.deleteReview.force
                )
            })
        })
    })

    it('Should return 404 when updating a product review informing wrong product_id', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((postResponse) => {
            let id = postResponse.body.id
            cy.putProductReviewWooCommerce(
                tokenFixture.token,
                id,
                999,
                productReviewFixture.changeValidReview.review,
                productReviewFixture.changeValidReview.reviewer,
                productReviewFixture.changeValidReview.reviewer_email,
                productReviewFixture.changeValidReview.rating
            ).then((updateResponse) => {
                expect(updateResponse.status).to.eq(statusFixture.not_found)
                cy.getProductReviewWooCommerce(
                    '/' + id,
                    tokenFixture.token
                ).then((getResponse) => {
                    expect(getResponse.status).to.eq(statusFixture.ok)
                    expect(getResponse.body.id).to.eq(id)
                    expect(getResponse.body.product_id).to.eq(productReviewFixture.validReview.product_id)
                    expect(getResponse.body.reviewer).to.eq(productReviewFixture.validReview.reviewer)
                    expect(getResponse.body.reviewer_email).to.eq(reviewer_email)
                    expect(getResponse.body.rating).to.eq(productReviewFixture.validReview.rating)
                })
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productReviewFixture.deleteReview.force
                )
            })
        })
    })
})

describe('Delete a Product Review', () => {

    it('Should delete a product review', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            let id = response.body.id
            return productReviewWooCommerceSchema.validateAsync(response.body),
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productReviewFixture.deleteReview.force
                ).then((response) => {
                    expect(response.status).to.eq(statusFixture.ok)
                })
        })
    })

    it('Should return status 401 when attempting to delete a product review without valid token', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((postResponse) => {
            var id = postResponse.body.id
            cy.deleteProductReviewWooCommerce(
                tokenFixture.invalidToken,
                id,
                productReviewFixture.deleteReview.force
            ).then((response) => {
                expect(response.status).to.eq(statusFixture.unauthorized)
                cy.getProductReviewWooCommerce(
                    '/'+ id,
                    tokenFixture.token
                ).then((response) => {
                    expect(response.status).to.eq(statusFixture.ok)
                })
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productReviewFixture.deleteReview.force
                )
            })
        })
    })

    it('Should return status 404 when attempting to delete a product review without informing the id', () => {
        let reviewer_email = faker.internet.email()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((postResponse) => {
            var id = postResponse.body.id
            cy.deleteProductReviewWooCommerce(
                tokenFixture.validToken,
                '',
                productReviewFixture.deleteReview.force
            ).then((response) => {
                expect(response.status).to.eq(statusFixture.not_found)
                cy.getProductReviewWooCommerce(
                    '/'+ id,
                    tokenFixture.token
                ).then((response) => {
                    expect(response.status).to.eq(statusFixture.ok)
                })
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productReviewFixture.deleteReview.force
                )
            })
        })
    })

})

describe('Retrieve all Product Review', () => {
    it('Should retrieve all review', () => {
        cy.getProductReviewWooCommerce(
            "",
            tokenFixture.token
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.ok)
            expect(response.body).exist

            for (let index = 0; index < response.body.length; index++) {
                return productReviewWooCommerceSchema.validateAsync(response.body[index])
            }
        })
    })
})