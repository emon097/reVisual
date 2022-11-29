import React from "react";
import { Disclosure } from "@headlessui/react";

const Blog = () => {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>
                  What are the different ways to manage a state in a React
                  application?
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                For example, local state would be needed to show or hide a modal
                component or to track values for a form component, such as form
                submission, when the form is disabled and the values of a form’s
                inputs. Global (UI) state – Global state is data we manage
                across multiple components. Global state is necessary when we
                want to get and update data anywhere in our app, or in multiple
                components at least. A common example of global state is
                authenticated user state. If a user is logged into our app, it
                is necessary to get and change their data throughout our
                application.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>How does prototypical inheritance work?</span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Every object with its methods and properties contains an
                internal and hidden property known as [[Prototype]]. The
                Prototypal Inheritance is a feature in javascript used to add
                methods and properties in objects. It is a method by which an
                object can inherit the properties and methods of another object.
                Traditionally, in order to get and set the [[Prototype]] of an
                object, we use Object.getPrototypeOf and Object.setPrototypeOf.
                Nowadays, in modern language, it is being set using __proto__.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>
                  What is a unit test? Why should we write unit tests?
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                The main objective of unit testing is to isolate written code to
                test and determine if it works as intended. Unit testing is an
                important step in the development process, because if done
                correctly, it can help detect early flaws in code which may be
                more difficult to find in later testing stages.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>React vs. Angular vs. Vue?</span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Although Angular, React and Vue have a significant learning
                curve, their uses upon mastery are limitless. For instance, you
                can integrate Angular and React with WordPress and WooCommerce
                to create progressive web apps.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Blog;
