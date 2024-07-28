import { Request, Response } from "express";
import resourceService from "../services/resourceService";

const createResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.createResource(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listResources = async (req: Request, res: Response) => {
  try {
    const resources = await resourceService.listResources(req.query);
    res.status(200).json(resources);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.getResource(req.params.id);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.updateResource(
      req.params.id,
      req.body
    );
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.deleteResource(req.params.id);
    if (resource) {
      res.status(200).json({ message: "Resource deleted" });
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createResource,
  listResources,
  getResource,
  updateResource,
  deleteResource,
};
