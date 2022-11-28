import tokenFixture from "../../../fixtures/token.json"
import productReviewFixture from "../../../fixtures/product-review.json"
import statusFixture from "../../../fixtures/status.json"
import productReviewWooCommerceSchema from "../../../contracts/wooCommerce/productreview.contract"
import { faker } from "@faker-js/faker"

describe('Smoke Test', () => {

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

})

describe('Acceptance Test', () => {

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

    it.only('Should return 404 when updating a product review informing wrong product_id', () => {
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