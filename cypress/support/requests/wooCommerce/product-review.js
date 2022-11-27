Cypress.Commands.add('deleteProductReviewWooCommerce', function (token, id, force) {
    cy.request({
        method: "DELETE",
        url: Cypress.env('wooCommerce') + Cypress.env('productReview') + '/' + id + '?force=' + force,
        failOnStatusCode: false,
        headers: {
            Authorization: token,
        }
    })
})

Cypress.Commands.add('getProductReviewWooCommerce', function (id, token){
    cy.request({
        method: "GET",
        url: Cypress.env('wooCommerce') + Cypress.env('productReview') + id,
        failOnStatusCode: false,
        headers: {
            Authorization: token,
        }
    })
})

Cypress.Commands.add('postProductReviewWooCommerce', function (token, product_id, review, reviewer, reviewer_email, rating) {
    cy.request({
        method: "POST",
        url: Cypress.env('wooCommerce') + Cypress.env('productReview'),
        failOnStatusCode: false,
        headers: {
            Authorization: token,
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating
        }
    })
})

Cypress.Commands.add('putProductReviewWooCommerce', function (token, id, product_id, review, reviewer, reviewer_email, rating) {
    cy.request({
        method: "PUT",
        url: Cypress.env('wooCommerce') + Cypress.env('productReview') + '/' + id,
        failOnStatusCode: false,
        headers: {
            Authorization: token,
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating
        }
    })
})


