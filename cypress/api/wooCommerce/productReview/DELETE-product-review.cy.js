import tokenFixture from "../../../fixtures/token.json"
import productReviewFixture from "../../../fixtures/product-review.json"
import statusFixture from "../../../fixtures/status.json"
import productReviewWooCommerceSchema from "../../../contracts/wooCommerce/productreview.contract"
import { faker } from "@faker-js/faker"

describe('Smoke Test', () => {

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

})

describe('Acceptance Tests', () => {

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