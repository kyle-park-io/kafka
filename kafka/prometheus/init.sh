sudo systemctl restart kafka-server

sudo yum install -y git

sudo amazon-linux-extras install -y docker
sudo usermod -a -G docker ec2-user
sudo chkconfig docker on
# sudo reboot

sudo mkdir -p /etc/prometheus
sudo cp prometheus.yml /etc/prometheus
sudo docker run -d --network host -p 9090:9090 -v /etc/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml --name prometheus prom/prometheus

sudo docker run -d --network host -p 3000:3000 --name grafana grafana/grafana:7.3.7

sudo mkdir -p /usr/local/jmx
sudo cp jmx_prometheus_httpserver-0.13.1-SNAPSHOT-jar-with-dependencies.jar /usr/local/jmx
sudo cp jmx_prometheus_httpserver.yml /usr/local/jmx

sudo cp jmx-exporter.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start jmx-exporter
sudo systemctl status jmx-exporter

wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-386.tar.gz
sudo tar zxf node_exporter-1.0.1.linux-386.tar.gz -C /usr/local
sudo ln -s /usr/local/node_exporter-1.0.1.linux-386 /usr/local/node_exporter
sudo cp node-exporter.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start node-exporter
sudo systemctl status node-exporter
