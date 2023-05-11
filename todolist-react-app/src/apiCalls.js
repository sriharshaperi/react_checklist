//invoked for adding new item to the list
export const addItem = async (item) => {
  try {
    const data = await fetch("http://localhost:3000/items", {
      body: JSON.stringify(item),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

//invoked for fetching a particular item from the list
export const viewItem = async (item) => {
  try {
    const data = await fetch(`http://localhost:3000/items`, {
      body: item,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(data.json());
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

//invoked for fetching all items from the list
export const viewAllItems = async () => {
  try {
    const data = await fetch("http://localhost:3000/items", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

//invoked for updating a particular item in the list
export const updateItem = async (item, id) => {
  try {
    const data = await fetch(`http://localhost:3000/items/${id}`, {
      body: JSON.stringify(item),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    return await data.json();
  } catch (error) {
    console.log("update error", error);
  }
};

//invoked for deleting a particular item in the list
export const deleteItem = async (item, id) => {
  try {
    const data = await fetch(`http://localhost:3000/items/${id}`, {
      body: item,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(data.json());
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

//invoked for deleting all items from the list
export const deleteAllItems = async () => {
  try {
    const data = await fetch("http://localhost:3000/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(data.json());
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

//invoked for searching an item from the list
export const searchItem = async (params) => {
  try {
    const data = await fetch("http://localhost:3000/items", {
      body: params,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(data.json());
    return data.json();
  } catch (error) {
    console.log(error);
  }
};
