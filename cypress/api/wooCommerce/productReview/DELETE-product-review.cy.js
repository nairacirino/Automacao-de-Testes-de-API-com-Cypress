import tokenFixture from "../../../fixtures/token.json"
import productReviewFixture from "../../../fixtures/product-review.json"
import statusFixture from "../../../fixtures/status.json"
import { faker } from "@faker-js/faker"
import productReviewWooCommerceSchema from "../../../contracts/productreview.contract"

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