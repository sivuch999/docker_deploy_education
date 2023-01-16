## ตรวจเช็คและเตรียมเครื่องมือ
* ติดตั้ง โปรแกรม vscode (https://code.visualstudio.com/download) หรือโปรแกรม code editor อื่นๆ
  * ถ้าใช้ vscode ลองติดตั้ง Extension: Markdown Preview Enchanced จะอ่านแลปง่ายขึ้น
* ติดตั้ง git (https://git-scm.com/downloads) และลองตรวจสอบ ด้วยคำสั่ง

      $ git -v
          
* ติดตั้ง nodejs v.^16 (https://nodejs.org/en/download) และลองตรวจสอบ ด้วยคำสั่ง

      $ node -v
    
      $ npm -v
    
* ติดตั้ง docker (https://www.docker.com) และลองตรวจสอบ ด้วยคำสั่ง

      $ docker -v
    
## ทดสอบ Run Code โปรแกรม
* clone project จาก https://github.com/sivuch999/docker_deploy_education.git
* เข้าไปที่ project เปิด terminal ขึ้นมา แล้วติดตั้ง package module ต่างๆที่จำเป็นในการ run code ด้วยคำสั่ง

      $ npm install
    
* ทดสอบ run code ด้วยคำสั่ง

      $ npm run dev
    
* ลองไปที่ browsers แล้วป้อน url เข้าไปที่ http://localhost:8080/ ถ้าถูกต้อง ระบบจะแสดงหน้าให้ระบุ ชื่อจริง-นามสกุล

  

## ทดสอบ Deployment Code โปรแกรมของเราใน localhost
  * Build โค้ดของเราไปอยู่ใน docker image --> docker build -t {IMAGE_NAME} .
      
        $ docker build -t docker-deploy .
        
  * run docker ให้เป็น container โดยใช้ port 8080 --> docker run -p {EXTERNAL_PORT}:{INTERNAL_PORT} {IMAGE_NAME}
      
        $ docker run -p 8080:8080 docker-deploy

## ทดสอบ Deployment Code โปรแกรมของเราขึ้นไปบน server
  ### ทดลอง push docker image ขึ้นไปใน dockerhub

  * เข้าไปที่เว็บ https://hub.docker.com/

  * สมัครสมาชิก และเข้าสู่ระบบ

  * สร้าง Repository ขึ้นมา

  * กลับมาที่หน้า terminal แล้ว build โค้ดของเราไปอยู่ใน docker image

  * แต่รอบนี้เปลี่ยน IMAGE_NAME ให้เป็นชื่อ username/repository ของ dockerhub --> docker build -t {HUB_USERNAME}/{HUB_REPOSITORY} .

        $ docker build -t sivuch999/docker-deploy .
        

  * ทำการ push docker image ของเราขึ้นไปบน docker hub --> docker push {HUB_USERNAME}/{HUB_REPOSITORY}:{TAG_NAME}

        $ docker push sivuch999/docker-deploy:latest

  * ลองไปดูที่หน้าเว็บ dockerhub จะเห็นว่ามี image ที่เรา push ขึ้นไปเมื่อกี้มาแล้ว
  ### เปิด Server ของตัวเองขึ้นมา (ในที่นี้แนะนำ Google Cloud เพราะมี Free Credit 300$)
  * ไปที่เว็บไซต์ https://console.cloud.google.com แล้ว เข้าสู่ระบบ
  * ไปที่ Compute Engine -> VM Instances -> Create Instance
    * Region: asia-southeast1 (Singapore)
    * Machine:
      * Series: E2
      * Type: e2-small
    * Access scopes:
      * Allow full access to all Cloud APIs
    * Firewall:
      * Allow HTTP traffic
      * Allow HTTPS traffic
  * ติดตั้ง Docker บน Server Instance
    * เปิด SSH ของ Instance ขึ้นมา
    * ไปที่เว็บไซต์ https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-debian-10
    * ติดตั้งตาม Step ที่เว็บไซต์แนะนำ (ทำแค่ Step1)
    * ลองตรวจสอบ ด้วยคำสั่ง

          $ docker -v

    * เข้าไปที่ Role root ด้วยคำสั่ง

          $ sudo -s
    
    * pull docker image จาก docker hub ด้วยคำสั่ง --> docker pull {HUB_USERNAME}/{HUB_REPOSITORY}:{TAG_NAME}

          $ docker pull sivuch999/docker-deploy:latest
      
    * run docker ให้เป็น container โดยใช้ port 8080 --> docker run -p {EXTERNAL_PORT}:{INTERNAL_PORT} {IMAGE_NAME}
    
          $ docker run -p 8080:8080 sivuch999/docker-deploy:latest

    * ลองเข้าไปที่ IP ของ Instance ตัวเอง เช่น http://34.143.166.34:8080 แล้วดูผลลัพธ์




## Docker Keyword
  **Command Options**
  * docker build = build code ให้เป็น image
  * docker run = run image ให้เป็น container
  * docker push = push image ขึ้นไปเป็น hub
  * docker pull = pull image ลงมาจาก hub
  * docker images = แสดง list images
  * docker ps = แสดง list container
  * docker images rm = ลบ image
  * docker rm = ลบ container
  * ดูเพิ่มเติม: docker --help


  **Build Options**
  * -t (tag) = ชื่อและแท็กของ image
  * ดูเพิ่มเติม: https://docs.docker.com/engine/reference/commandline/build/


  **Run Options**
  * -p (port) = ให้รันบน port ไหน?
  * -d (detached mode) = สั่งรันแบบ background 
  * ดูเพิ่มเติม: https://docs.docker.com/engine/reference/commandline/run/

### Docker Compose
* ไม่น่าทันไว้ก่อนละกัน ><