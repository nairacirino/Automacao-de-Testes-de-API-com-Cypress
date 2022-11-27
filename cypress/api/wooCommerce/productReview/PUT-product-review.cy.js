import tokenFixture from "../../../fixtures/token.json"
import productReviewFixture from "../../../fixtures/product-review.json"
import statusFixture from "../../../fixtures/status.json"
import { faker } from "@faker-js/faker"
import productReviewWooCommerceSchema from "../../../contracts/wooCommerce/productreview.contract"

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