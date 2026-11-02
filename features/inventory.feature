@regression
Feature: Product inventory

  Background:
    Given I am logged in as a standard user

  Scenario: Inventory page displays six products
    Then I should see 6 products

  Scenario: Add a product to the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  Scenario: Sort products by price low to high
    When I sort products by "lohi"
    Then products should be sorted by price from low to high
