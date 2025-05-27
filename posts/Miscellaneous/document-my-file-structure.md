<hr>
<div class="question-header">
<h3>Asked this Question</h3>
<p>Document my file system structure as follows</p>
</div>
### Task:

- **Input**: A folder path (directory) that you want to scan.
- **Output**: A JSON file that contains details about the files and subdirectories within the given folder.
- **Process**: Walk through the folder and its subfolders (recursively) to gather information about each file and subdirectory, and store this information in a structured JSON format.

### Information to gather at the file level:

- **File Name**: The name of the file.
- **File Path**: The full path to the file.
- **File Size**: The size of the file in bytes.
- **Last Modified Time**: The timestamp of when the file was last modified.
- **File Type/Extension**: The file extension or MIME type (optional).
- **Folder Structure**: Keep track of the folder structure recursively, maintaining relationships between directories and their files.

<hr>

### Example JSON structure:

```json
{
  "folder_name": "parent_folder",
  "files": [
    {
      "name": "file1.txt",
      "path": "/path/to/file1.txt",
      "size": 1024,
      "last_modified": "2024-12-05T12:30:00",
      "type": "text/plain"
    },
    {
      "name": "file2.png",
      "path": "/path/to/file2.png",
      "size": 2048,
      "last_modified": "2024-12-04T10:20:00",
      "type": "image/png"
    }
  ],
  "subdirectories": [
    {
      "folder_name": "subfolder1",
      "files": [
        {
          "name": "file3.txt",
          "path": "/path/to/subfolder1/file3.txt",
          "size": 512,
          "last_modified": "2024-12-03T08:15:00",
          "type": "text/plain"
        }
      ],
      "subdirectories": []
    }
  ]
}
```

---

### Script Outline:

1. **Input**: Accept the folder path from the user.
2. **Walk Through Folder**: Use `os.walk()` to recursively scan the folder and its subfolders.
3. **File Metadata**: For each file:
   - Get the file name, size, last modified time, and extension.
   - Optionally, use `mimetypes` to get the MIME type or file extension.
4. **JSON Structure**: For each folder, create an entry in the JSON file.
   - A folder can have files and subfolders.
5. **Output**: Write the gathered information into a JSON file.

Now, I will write the Python script based on this outline.

### Python Script:

```python
import os
import json
import time
import mimetypes

def get_file_info(file_path):
    """
    Retrieves file metadata including name, size, last modified time, and MIME type.
    """
    file_info = {}
    try:
        file_info["name"] = os.path.basename(file_path)
        file_info["path"] = file_path
        file_info["size"] = os.path.getsize(file_path)
        file_info["last_modified"] = time.ctime(os.path.getmtime(file_path))

        # Get MIME type based on file extension (optional)
        mime_type, _ = mimetypes.guess_type(file_path)
        file_info["type"] = mime_type if mime_type else "unknown"

    except Exception as e:
        print(f"Error processing {file_path}: {e}")

    return file_info

def scan_directory(directory_path):
    """
    Walks the directory tree and creates a structured JSON object with file and folder details.
    """
    directory_data = {
        "folder_name": os.path.basename(directory_path),
        "files": [],
        "subdirectories": []
    }

    for root, dirs, files in os.walk(directory_path):
        # For each directory, gather its files and subdirectories
        if root == directory_path:  # Top-level directory
            for file in files:
                file_path = os.path.join(root, file)
                directory_data["files"].append(get_file_info(file_path))
            for sub_dir in dirs:
                sub_dir_path = os.path.join(root, sub_dir)
                directory_data["subdirectories"].append(scan_directory(sub_dir_path))

    return directory_data

def save_to_json(data, output_path):
    """
    Saves the directory data to a JSON file.
    """
    with open(output_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4)

def main(input_directory, output_json_file):
    """
    Main function to scan a directory and save the information in a JSON file.
    """
    # Scan the directory and gather all file/folder information
    directory_info = scan_directory(input_directory)

    # Save the gathered information to a JSON file
    save_to_json(directory_info, output_json_file)
    print(f"Directory structure saved to {output_json_file}")

if __name__ == "__main__":
    # Example usage
    folder_path = "/path/to/your/folder"  # Replace with the path to scan
    output_json = "folder_structure.json"  # Output JSON file

    main(folder_path, output_json)
```

### Explanation:

1. **get_file_info()**:

   - Retrieves basic file details: name, path, size, and last modified time.
   - Uses `mimetypes.guess_type()` to guess the MIME type based on the file extension (optional).

2. **scan_directory()**:

   - Walks the directory recursively using `os.walk()`.
   - For each directory, it gathers file info and recursively collects data for any subdirectories.

3. **save_to_json()**:

   - Saves the structured data to a JSON file, with proper indentation for readability.

4. **main()**:
   - Initiates the directory scan and saves the resulting data to a JSON file.

### Example Usage:

1. Replace `folder_path` with the path to the directory you want to scan.
2. The script will generate a JSON file (`folder_structure.json`) containing the folder structure and metadata.

### Notes:

- The script collects both files and subdirectories.
- It handles potential errors like permission issues or files being inaccessible.
- The output is a nested JSON structure that reflects the directory and subdirectory hierarchy.
<hr>
