/* eslint-disable @typescript-eslint/no-explicit-any */
import Resource, { IResource } from "../models/resource";

const createResource = async (data: Partial<IResource>): Promise<IResource> => {
  const resource = new Resource(data);
  await resource.save();
  return resource;
};

const listResources = async (query: any): Promise<IResource[]> => {
  const { name, description } = query;
  const filter: any = {};
  if (name) filter.name = { $regex: name, $options: "i" };
  if (description) filter.description = { $regex: description, $options: "i" };
  return Resource.find(filter);
};

const getResource = async (id: string): Promise<IResource | null> => {
  return Resource.findById(id);
};

const updateResource = async (
  id: string,
  data: Partial<IResource>
): Promise<IResource | null> => {
  return Resource.findByIdAndUpdate(id, data, { new: true });
};

const deleteResource = async (id: string): Promise<IResource | null> => {
  return Resource.findByIdAndDelete(id);
};

export default {
  createResource,
  listResources,
  getResource,
  updateResource,
  deleteResource,
};
